const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "seek",
    description: "Cerca una posizione nella canzone",
    usage: "<time s/m/h>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["forward"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Non sta suonando niente in questo momento...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Devi essere in un canale vocale per usare questo comando!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");
        if (!player.queue.current.isSeekable) return client.sendTime(message.channel, "❌ | **Non riesco a cercare questa canzone!**");
        let SeekTo = client.ParseHumanTime(args.join(" "));
        if (!SeekTo) return client.sendTime(message.channel, `**Utilizzo - **\`${GuildDB.prefix}seek <numero s/m/h>\` \n**Esempio - **\`${GuildDB.prefix}seek 2m 10s\``);
        player.seek(SeekTo * 1000);
        message.react("✅");
    },

    SlashCommand: {
        options: [
            {
                name: "position",
                description: "Inserisci un timestamp che desideri cercare. Esempio - 2m 10s",
                value: "position",
                type: 3,
                required: true,
                /*
                 @param {import("../structures/DiscordMusicBot")} client
                 @param {import("discord.js").Message} message
                 @param {*} param3
               */
                run: async (client, interaction, args, { GuildDB }) => {
                    const guild = client.guilds.cache.get(interaction.guild_id);
                    const member = guild.members.cache.get(interaction.member.user.id);
                    let player = await client.Manager.get(interaction.guild_id);
                  
                    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Devi essere in un canale vocale per usare questo comando.**");
                    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");
                    if (!player) return client.sendTime(interaction, "❌ | **Non sta suonando niente in questo momento...**");
                    if (!player.queue.current.isSeekable) return client.sendTime(interaction, "❌ | **Non sono in grado di cercare questa canzone!**");
                    let SeekTo = client.ParseHumanTime(interaction.data.options[0].value);
                    if (!SeekTo) return client.sendTime(interaction, `**Utilizzo - **\`${GuildDB.prefix}seek <numero s/m/h>\` \n**Esempio -** \`${GuildDB.prefix}seek 2m 10s\``);
                    player.seek(SeekTo * 1000);
                    client.sendTime(interaction, "✅ | **Il brano è stato spostato con successo in **", `\`${Seekto}\``);
                },
            },
        ],
    },
};

