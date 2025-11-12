const { Client, RichPresence } = require('discord.js-selfbot-v13');
const dotenv = require('dotenv');
const { startServer } = require('./server.js');
const config = require('./config.js');

dotenv.config();

const client = new Client({
  checkUpdate: false
});

const TOKEN = process.env.TOKEN;

// Start Express server
startServer(config.BOT.PORT);

// Keep-alive ping every 5 minutes
setInterval(() => {
  console.log('[Keep-Alive] Bot is still running...');
}, 5 * 60 * 1000);

client.on('ready', async () => {
  console.log(`${client.user.username} is now online 24/7!`);
  console.log(`Logged in as: ${client.user.tag}`);
  console.log(`User ID: ${client.user.id}`);

  const rpc = new RichPresence(client)
    .setApplicationId(config.RPC.applicationId)
    .setType(config.RPC.type)
    .setName(config.RPC.name)
    .setDetails(config.RPC.details)
    .setState(config.RPC.state)
    .setStartTimestamp(config.RPC.startTimestamp)
    .addButton(config.RPC.button.label, config.RPC.button.url);

  client.user.setActivity(rpc.toJSON());
});

client.on('disconnect', () => {
  console.log('Disconnected! Attempting to reconnect...');
  client.login(TOKEN);
});

client.on('error', (error) => {
  console.error('Error occurred:', error);
});

client.login(TOKEN).catch(err => {
  console.error('Failed to login:', err);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});
