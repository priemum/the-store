const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const levels = {
    none: 0.0,
    low: 0.2,
    medium: 0.3,
    high: 0.35,
};
module.exports = {
    name: "bassboost",
    description: "Consente l'effetto audio di bass boost",
    usage: "<none|low|medium|high>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["bb", "bass"],

  /**
      @param {import("../structures/DiscordMusicBot")} client
      @param {import("discord.js").Message} message
      @param {string[]} args
      @param {*} param3
      */
      
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Non riproducendo niente in questo momento...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Devi essere in un canale vocale per usare questo comando!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");

        if (!args[0]) return client.sendTime(message.channel, "**Fornisci un livello di bass boost. \nLivelli disponibili:** `none`, `low`, `medium`, `high`"); //if the user do not provide args [arguments]

        let level = "none";
        if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

        player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

        return client.sendTime(message.channel, `✅ | **Bassboost settato a livello** \`${level}\``);
    },
    SlashCommand: {
        options: [
            {
                name: "level",
                description: `Fornisci un livello di potenziamento dei bassi. Livelli disponibili: low, medium, high, or none`,
                value: "[level]",
                type: 3,
                required: true,
            },
        ],
        /**
         *
         * @param {import("../structures/DiscordMusicBot")} client
         * @param {import("discord.js").Message} message
         * @param {string[]} args
         * @param {*} param3
         */

        run: async (client, interaction, args, { GuildDB }) => {
            const levels = {
                none: 0.0,
                low: 0.2,
                medium: 0.3,
                high: 0.35,
            };

            let player = await client.Manager.get(interaction.guild_id);
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            if (!player) return client.sendTime(interaction, "❌ | **Non riproducendo niente in questo momento...**");
            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Devi essere in un canale vocale per usare questo comando.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(voiceChannel)) return client.sendTime(interaction, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");
            if (!args) return client.sendTime(interaction, "**Fornisci un livello di bass boost. \nLivelli disponibili:** `none`, `low`, `medium`, `high`"); //if the user do not provide args [arguments]

            let level = "none";
            if (args.length && args[0].value in levels) level = args[0].value;

            player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

            return client.sendTime(interaction, `✅ | **Bassboost settato al livello** \`${level}\``);
        },
    },
};
