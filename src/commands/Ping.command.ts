import { ApiClient, ChannelId, Command, CommandExecution, TwitchApi } from "twitch-bot-framework";

@Command({
    commandName: "ping",
    transistent: true
})
export default class PingCommand implements CommandExecution { 
    async commandExecution(
        @TwitchApi() api: ApiClient,
        @ChannelId() channelId: string
    ) {
        api.sendMessage(channelId, `Pong!`);
    }
}