module.exports = {
  Admins: ["326800342450700290"], //Admins of the bot
  ExpressServer: true,//If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || "-", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/gszYH8X4wh", //Support Server Link
  Token: process.env.Token || "Nzk1NDE0MDExOTY1MDc5NTky.X_JBBg.jsdvgste6Bs_Dqc7wlGqEQ46BOQ", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "795414011965079592", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "9nBxwtmolfjRmvSgVB0PHGo8zeBYtG3k", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": false, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "the store • Cookie", //A Secret like a password
  IconURL:
    "https://cdn.discordapp.com/attachments/885588243301695538/892154565955313704/lofi.png", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  EmbedColor: "RANDOM", //Color of most embeds | Dont edit unless you want a specific color instead of a random one each time
  Permissions: 2205280576, //Bot Inviting Permissions
  Website: process.env.Website || "http://localhost", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku

  //Lavalink
   Lavalink: {
    id: "Main",
    host: "lavalink-replit.eryycr.repl.co",
    port: 433,
    pass: "maybeiwasboring", 
    secure: false, // Set this to true if you're self-hosting lavalink on replit.
  },


  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "1a1d1e71f7784ec69fd2d35f7bc44591", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "a975b9f4ef7846aa96b2f752fe5186dc", //Spotify Client Secret
  },
};
