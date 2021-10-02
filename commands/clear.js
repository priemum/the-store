const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Cancella la coda del server",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["cl", "cls"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Non sta suonando niente in questo momento...**"
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(message.channel, "❌ | **Non sta suonando niente in questo momento...**");
      if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Devi essere in un canale vocale per riprodurre qualcosa!**");
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");
    player.queue.clear();
    await client.sendTime(message.channel, "✅ | **Cancellata la coda!**");
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
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      if (!member.voice.channel) return client.sendTime(interaction, "❌ | Devi essere in un canale vocale per riprodurre qualcosa!");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Devi essere nel mio stesso canale vocale per usare questo comando!**");
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(interaction, "❌ | **Non sta suonando niente in questo momento...**");

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime(interaction, "❌ | **Non sta suonando niente in questo momento...**");
      player.queue.clear();
      await client.sendTime(interaction, "✅ | **Cancellata la coda!**");
    },
  },
};
