# Important

## tsconfig.json
Make sure you have configured `tsconfig.json` correctly.
```json
{
    "compilerOptions": {
        "target": "ES2021",
        "module": "commonjs",
        "experimentalDecorators": true, // required for decorators
        "emitDecoratorMetadata": true, // required for decorators
        "esModuleInterop": true,
    },
    "include": ["src"],
    "exclude": ["node_modules"]
}
```

## .gitignore
Make sure that the `.gitignore` file contains `storage`. This file will store the application access token.

# Usage

## Twitch client required values
```typescript
{
    clientId: string, // ClientID from TwitchDev
    clientSecret: string,  // ClientSecret from TwitchDev
    userRefreshToken: string,  // User refresh token from TwitchCLI (should have scopes: user:bot, channel:bot, user:read:chat, user:write:chat)
    userId: string, // User ID
    projectPath: string, // Path to main root of project (this will be used as a relative path for finding commands and creating the needed files)
}
```
- A `user` is an account that will act as a bot user

## Twitch client options
```typescript
{
    links: { // You can change links for testing with mocked server via TwitchCLI
        EventSubWebsocket: string;
        EventSubApi: string;
        TwitchApi: string;
        TwitchOauth: string;
    };
    logger: {
        output: LogType[]; // You can specify which types of logs should appear in console
        modulePrefix: {
            [ClientType / HandlerType / ManagerType]: {
                prefix: {
                    type: MessageFragmentType.Text,
                    text: '[CustomPrefix]',
                    style: LogStyleDecorator.Reset,
                }
            }
        }
        logTypePrefix: {
            [LogType]: {
                prefix: {
                    type: MessageFragmentType.Text,
                    text: '[CustomPrefix]',
                    style: LogStyleDecorator.Reset,
                }
            }
        }
    }
}
```

Prefix can be build by builder
```typescript
{
    prefix: [new CustomLogMessageFragmentBuilder().setText(prefix).setStyle(style).build()],
}
```

## Commands

### Interfaces
- **BeforeCommandExecution** requires the `beforeCommandExecution(...)` method, which will be called before the main command execution.
- **CommandExecution** requires the `commandExecution(...)` method.
- **AfterCommandExecution** requires the `afterCommandExecution(...)` method, which will be called after the main command execution.

### Decorators
#### Registering command
- **Command**: Class have to be decorated with @Command decorator
```typescript
{
    commandName: string; // It will be used to invoke commands with the prefix '!'
    transistent?: boolean; // Determines whether an instance of the class will be created once the first time it is used, or whether it will be new each time it is used (default: false)
}
```

#### Data access
- **Raw** (ChannelChatMessageEventData object): [Channel Chat Message Event](https://dev.twitch.tv/docs/eventsub/eventsub-reference/)

- **TwitchAPI** (APIClient class): Interaction with TwitchAPI - [Docs](docs/clients/ApiClient.md)

- **UserId** (string): The ID of the user who invoked the command
- **ChannelId** (string): The identifier of the channel in which the command was invoked

- **IsModerator** (boolean): True if user is moderator
- **IsBroadcaster** (boolean): True if user is broadcaster

- **User** ([TwitchUser](docs/objects/TwitchUser.md)): (limited functionality, will be developed)
- **Channel** ([TwitchChannel](docs/objects/TwitchChannel.md)): (limited functionality, will be developed)
- **Chat** ([TwitchChat](docs/objects/TwitchChat.md)): (limited functionality, will be developed)

Decorators can be used in methods defined by the interface specified above
```typescript
commandExecution(
    @Raw() raw: ChannelChatMessageEventData,
    @Channel() channel: TwitchChannel,
    @IsModerator() isModerator: boolean,
    @IsBroadcaster() isBroadcaster: boolean,
)
```

### Examples

- [Ping](src/commands/Ping.command.ts)
- [Raffle](src/commands/Raffle.command.ts)

## Token management
Tokens are managed automatically by TokenManager.

You can add a user refresh token by calling a method:
```typescript
const twitchClient = TwitchClientFactory(...);
twitchClient.tokens.setUserRefreshToken(userId: string, refreshToken: string)
```

The framework will generate an access token if needed. 
The access token will be used if you call an endpoint that requires the token. 
The `forceAppToken` option will force the use of the application token. [Read more here](docs/clients/ApiClient.md#methods)