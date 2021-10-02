const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

  module.exports = {
    name: "remove",
    description: `Rimuovere una canzone dalla coda`,
    usage: "[number]",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["rm"],

    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1); 
    if (!player) return client.sendTime(message.channel, "❌ | **Non sta suonando niente in questo momento...**");
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Devi essere in un canale vocale per usare questo comando!**");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");
        
    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("Non c'è niente in coda da rimuovere");
    let rm = new MessageEmbed()
      .setDescription(`✅ **|** Traccia rimossa **\`${Number(args[0])}\`** dalla lista!`)
      .setColor("GREEN")
      if (isNaN(args[0]))rm.setDescription(`**Utilizzo - **${client.botconfig.prefix}\`remove [traccia]\``);
      if (args[0] > player.queue.length)
      rm.setDescription(`La lista ha solo ${player.queue.length} canzoni!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

  SlashCommand: {
    options: [
      {
          name: "track",
          value: "[track]",
          type: 4,
          required: true,
          description: "Rimuovere una canzone dalla coda",
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
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const song = player.queue.slice(args[0] - 1, 1);
      if (!player) return client.sendTime(interaction, "❌ | **Non sta suonando niente in questo momento...**");
      if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Devi essere in un canale vocale per usare questo comando.**");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");
  
      if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime("❌ | **Non sta suonando niente in questo momento...**");
      let rm = new MessageEmbed()
        .setDescription(`✅ | **Traccia rimossa** \`${Number(args[0])}\` dalla lista!`)
        .setColor("GREEN")
      if (isNaN(args[0])) rm.setDescription(`**Utilizzo:** \`${GuildDB.prefix}remove [traccia]\``);
      if (args[0] > player.queue.length)
        rm.setDescription(`La lista ha solo ${player.queue.length} canzoni!`);
      await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  }
};
