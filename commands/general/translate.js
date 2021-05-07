const db = require('quick.db')
const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")
const translate = require("@iamtraction/google-translate")

module.exports = {
     config: {
          name: "translate",
          aliases: ["tra", "translate"],
          description: "Translate the text which is user input",
          example: "tra my hello",
          usage: "translate <language iso code> <text>",
     },
     run: async (bot, message, args) => {
          const txt = args.slice(1).join(" ")
          const lang = args[0]
          if (!lang) return message.channel.send("Please provide a ISO code language. E.g `English > en`")
          if (!txt) return message.channel.send("Please provide a text to translate")

          translate(txt, { to: lang }).then(res => {
               const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag)
                    .setTitle(`**Google translate**`)
                    .setColor(`RANDOM`)
                    .setDescription(res.text)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
                    .setTimestamp()

               message.channel.send(embed);

          }).catch(err => {
               message.channel.send("Please provide a valid ISO language code")
          })
     }
}