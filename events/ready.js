module.exports = async (client) => {
  client.Ready = true, 
  client.user.setPresence({
    status: "dnd",  // You can show online, idle, and dnd
    activity: {
        name: "the store • /help",  // The message shown
        type: "LISTENING", // PLAYING, WATCHING, LISTENING, STREAMING,
    }
});
    client.Manager.init(client.user.id);
    client.log("Accesso effettuato con successo come " + client.user.tag); // You can change the text if you want, but DO NOT REMOVE "client.user.tag"
client.RegisterSlashCommands();
};

