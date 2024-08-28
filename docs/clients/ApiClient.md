# ApiClient

Client to interact with TwitchAPI

## Methods

- **sendMessage**(channeId: string, message: string, senderId: string, forceAppToken: boolean)
    - *channelId*: Determines on which channel the message will be sent.
    - *message*: Defines the message
    - *senderId*: Determines which user will send the message
        - Default: Bot user specified in twitch client
        - Requires:
            - User access token with scopes `user:read:chat`, `user:write:chat`
            - App access token if user granted `user:bot`, `channel:bot` permissions
    - *forceAppToken*: True, if the application access token should be used instead of the user access token (if it exists with the required scopes)

- **getUserById**(id: string)
    - *id*: Gets the data of a user with a specific ID

- **getUserByLogin**(login: string)
    - *login*: Gets the data of a user with a specific login