import { ChannelChatMessageEventData, Command, CommandExecution, Raw, Channel, TwitchChannel, IsModerator, IsBroadcaster } from "twitch-bot-framework";

@Command({
    commandName: "raffle",
    transistent: false
})
export default class PingCommand implements CommandExecution { 
    async commandExecution(
        @Raw() raw: ChannelChatMessageEventData,
        @Channel() channel: TwitchChannel,
        @IsModerator() isModerator: boolean,
        @IsBroadcaster() isBroadcaster: boolean,
    ) {
        const args = raw.message.text.split(" ").slice(1);
        const type = args[0];
        const avaliableTypes = ["start", "end", "roll", "join", "delete"];
        if(!avaliableTypes.includes(type)) {
            return channel.chat.sendMessage(`@${raw.chatter_user_name} Invalid type. Avaliable types: ${avaliableTypes.join(", ")}`);
        }

        const canManage = isModerator || isBroadcaster;
        switch(type) {
            case "start": {
                if(!canManage) return channel.chat.sendMessage(`@${raw.chatter_user_name} You do not have permission to start a raffle.`);
                return channel.chat.sendMessage(Raffle.create(raw.broadcaster_user_id));
            }
            case "end": {
                if(!canManage) return channel.chat.sendMessage(`@${raw.chatter_user_name} You do not have permission to start a raffle.`);
                const raffle = Raffle.get(raw.broadcaster_user_id);
                if(raffle === undefined) return channel.chat.sendMessage(`@${raw.chatter_user_name} The raffle does not exist.`);
                return channel.chat.sendMessage(raffle.end());
            }
            case "roll": {
                if(!canManage) return channel.chat.sendMessage(`@${raw.chatter_user_name} You do not have permission to start a raffle.`);
                const raffle = Raffle.get(raw.broadcaster_user_id);
                if(raffle === undefined) return channel.chat.sendMessage(`@${raw.chatter_user_name} The raffle does not exist.`);
                return channel.chat.sendMessage(raffle.roll());
            }
            case "join": {
                const raffle = Raffle.get(raw.broadcaster_user_id);
                if(raffle === undefined) return channel.chat.sendMessage(`@${raw.chatter_user_name} The raffle does not exist.`);
                return channel.chat.sendMessage(raffle.join(raw.chatter_user_name));
            }
            case "delete": {
                if(!canManage) return channel.chat.sendMessage(`@${raw.chatter_user_name} You do not have permission to start a raffle.`);
                const raffle = Raffle.get(raw.broadcaster_user_id);
                if(raffle === undefined) return channel.chat.sendMessage(`@${raw.chatter_user_name} The raffle does not exist.`);
                return channel.chat.sendMessage(raffle.delete());
            }
        }
    }
}

class Raffle {
    static map: Map<string, Raffle> = new Map();
    static create(channelId: string) {
        if(Raffle.map.has(channelId)) return "The raffle already exists.";
        const raffle = new Raffle(channelId);
        Raffle.map.set(channelId, raffle);
        return "The raffle has been created.";
    }
    static get(channelId: string) {
        return Raffle.map.get(channelId);
    }

    private users: string[] = [];
    private ended: boolean;

    private constructor(private channelId: string) {
        this.ended = false;
    }

    join(userName: string) {
        if(this.ended) return "The raffle has ended.";
        if(this.users.includes(userName)) return "You are already in the raffle.";
        this.users.push(userName);
        return "You have joined the raffle.";
    }

    end() {
        if(this.ended === true) return "The raffle has already ended.";
        this.ended = true;
        return "The raffle has ended.";
    }

    roll() {
        if(this.ended === false) return "The raffle has not ended.";
        if(this.users.length === 0) return "There is no one in the raffle.";
        const winner = this.users[Math.floor(Math.random() * this.users.length)];
        this.users = this.users.filter(user => user !== winner);
        return `The winner is: @${winner}`;
    }

    delete() {
        if(this.ended === false) "The raffle has not ended.";
        if(!Raffle.map.has(this.channelId)) return "The raffle does not exist.";
        Raffle.map.delete(this.channelId);
        return "The raffle has been deleted.";
    }
}