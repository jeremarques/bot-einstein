require('dotenv').config()
const { Client, Intents } = require('discord.js')

const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
    ],
})

client.on('ready', () => {
  console.log("O bot-einstein está no ar.")
})

client.on('messageCreate', (message) => {
  if (message.author.bot) return
  
  const user = message.author
  const date  = new Date()
  const hour = date.getHours()
  let greeting = ""
  
  if (hour < 12 && hour >= 0) {
    greeting = "Bom dia"
  } else if (hour < 18) {
    greeting = "Boa tarde"
  } else {
    greeting = "Boa noite"
  }
  
  const docs = require('./src/events/doc-event/docs.json')
  
  const docsCommand = Object.keys(docs);
  
  if (docsCommand.includes(message.content.toLowerCase())) {
    message.channel.send(`Olá ${user}, ${greeting}.\nVocê pode encontrar mais informações sobre ${message.content.toLowerCase()} em: ${docs[message.content.toLowerCase()]}.\n#neverStopLerning!`)
  }
})

client.login(process.env.TOKEN)