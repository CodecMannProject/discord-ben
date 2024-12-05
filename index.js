const { Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

    commands = client.application.commands
    commands.create({
      name: 'ping',
      description: 'Replies with pong'
    })
    commands.create({
      name: 'setup',
      description: `Changes ben's settings`,
      options: [
        {
          name: 'channel',
          description: 'Choose new house for ben',
          required: true,
          type: 'CHANNEL'
        }
      ]
    })
    client.user.setPresence({
      activities: [
        {
          name: 'Anwering Questions',
          type: 'PLAYING',
        },
      ],
      status: 'online',
    });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction

  if (commandName === 'ping'){
    interaction.reply({
      content: 'Pong',
    })
  }else if (commandName === 'setup'){
    const channel = options.getChannel('channel')
    channelId = channel.id
    interaction.reply({
      content: `Successfully changed ben's settings`,
      ephemeral: true,
    })
  }
})

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.channel.id === channelId) {
      if (message.content.endsWith('?') || message.channel.type === 'DM') {
        const variants = ['Yes', 'No', 'Hahaha', 'Foo'];
        const response = variants[Math.floor(Math.random() * variants.length)]; 
        await message.channel.send(`${response}`); }
    }
  });

client.login(process.env.DISCORD_TOKEN);