const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once('ready', () => {
  console.log('Logged in as ' + client.user.tag);
  
  const discordChannel = client.channels.cache.get(config.discordChannelId);
  const instagramChannel = client.channels.cache.get(config.instagramChannelId);

  if (discordChannel && instagramChannel) {
    setInterval(() => {
      const memberCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
      const instagramFollowers = getInstagramFollowers(); 

      discordChannel.setName(`Discord: ${formatNumber(memberCount)}`);
      instagramChannel.setName(`Instagram: ${formatNumber(instagramFollowers)}`);
    }, 600000); 
  } else {
    console.error('Invalid channel IDs in config.json');
  }
});

function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}

function getInstagramFollowers() {
  return 11111111111111111111111111111111
}

client.login(config.token);
