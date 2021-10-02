const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Ferma la musica e lascia il canale vocale",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Devi essere in un canale vocale per usare questo comando**");
    if (!player) return client.sendTime(message.channel,"❌ | **Non sta suonando niente in questo momento...**");
    await client.sendTime(message.channel,":notes: | **Disconnesso!**");
    await message.react("✅");
    player.destroy();
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

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Devi essere in un canale vocale per usare questo comando.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `❌ | **Devi essere in ${guild.me.voice.channel} per usare questo comando.**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Non sta suonando niente in questo momento**"
        );
      player.destroy();
      client.sendTime(
        interaction,
        ":notes: | **Disconnesso!**"
      );
    },
  },
};
