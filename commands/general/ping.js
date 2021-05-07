const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")

module.exports = {
     config: {
          name: "ping",
          aliases: ["ping"],
          description: "Show the bot latency",
          usage: "ping",
     },
     run: async (bot, message, args) => {
          message.reply('Calculated ping <a:giphy:836945718039150652> ....').then(resultMessage => {
               const ping = resultMessage.createdTimestamp - message.createdTimestamp;
               const embed = new Discord.MessageEmbed()
                    .setTitle("Pong!:ping_pong: ....")
                    .setColor('RANDOM')
                    .setDescription(`Bot latency: ${ping}ms, API Latency: ${bot.ws.ping}ms`)
                    .setTimestamp()
               message.delete()
               resultMessage.edit(embed)

               //resultMessage.edit(`Bot latency: ${ping}ms, API Latency: ${client.ws.ping}ms`)
          })
     }
}