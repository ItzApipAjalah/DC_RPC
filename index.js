const { Client, RichPresence } = require('discord.js-selfbot-v13');
const dotenv = require('dotenv');
const { startServer } = require('./server.js');

dotenv.config();

const client = new Client({
  checkUpdate: false
});

const TOKEN = process.env.TOKEN;
const PORT = process.env.PORT || 3000;

// Start Express server
startServer(PORT);

client.on('ready', async () => {
  console.log(`${client.user.username} is now online 24/7!`);
  console.log(`Logged in as: ${client.user.tag}`);
  console.log(`User ID: ${client.user.id}`);

  const rpc = new RichPresence(client)
    .setApplicationId('1438147354619281449') 
    .setType('PLAYING')                      
    .setName('RAWR')                         
    .setDetails('OI JAWA')                      
    .setState('🦖')                 
    .setStartTimestamp(Date.now() - (2555 * 24 * 60 * 60 * 1000)) 
    .addButton('About Me', 'https://afifmedya.my.id/');

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
