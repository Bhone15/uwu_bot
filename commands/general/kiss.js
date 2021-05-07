const db = require('quick.db')
const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")

module.exports = {
     config: {
          name: "kiss",
          aliases: ["kiss"],
          description: "Kiss your friend",
          example: "kiss @Eli",
          usage: "kiss <@user>",
     },
     run: async (bot, message, args) => {
          images = [
               'https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif',
               'https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif?itemid=6155657',
               'https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif',
               'https://acegif.com/wp-content/uploads/anime-kiss-m.gif',
               'https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif',
               'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
               'https://media0.giphy.com/media/KH1CTZtw1iP3W/source.gif'
          ]

          personKissed = message.mentions.users.first() || message.author;
          let embed = new Discord.MessageEmbed()
               .setTitle(`You kiss ${personKissed.username} :heart:`)
               .setImage(images[Math.floor(Math.random() * images.length)])
               .setTimestamp();

          message.channel.send(embed);
     }
}