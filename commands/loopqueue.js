const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "loopqueue",
    description: "Loop l'intera coda",
    usage: "",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["lq", "repeatqueue", "rq"],
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

        if (player.queueRepeat) {
          player.setQueueRepeat(false)
          client.sendTime(message.channel, `:repeat: Queue Loop \`Disabilitato\``);
        } else {
          player.setQueueRepeat(true)
          client.sendTime(message.channel, `:repeat: Queue Loop \`Abilitato\``);
        }
    },
    SlashCommand: {
       /**
       *
       * @param {import("../structures/DiscordMusicBot")} client
       * @param {import("discord.js").Message} message
       * @param {string[]} args
       * @param {*} param3
       */
        run: async (client, interaction, args, { GuildDB }) => {
          let player = await client.Manager.get(interaction.guild_id);
          const guild = client.guilds.cache.get(interaction.guild_id);
          const member = guild.members.cache.get(interaction.member.user.id);
          const voiceChannel = member.voice.channel;
          let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
            if (!player) return client.sendTime(interaction, "❌ | **Non sta suonando niente in questo momento...**"); 
            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Devi essere in un canale vocale per usare questo comando.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(voiceChannel)) return client.sendTime(interaction, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");

            if(player.queueRepeat){
                  player.setQueueRepeat(false)
                  client.sendTime(interaction, `:repeat: **Queue Loop** \`Disabilitato\``);
              }else{
                  player.setQueueRepeat(true)
                  client.sendTime(interaction, `:repeat: **Queue Loop** \`Abilitato\``);
              }
          console.log(interaction.data)
        }
      }    
};
