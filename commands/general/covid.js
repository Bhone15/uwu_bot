const got = require('got');
const db = require('quick.db')
const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")
const api = require('novelcovid');

module.exports = {
     config: {
          name: "covid",
          aliases: ["covid", "cv", "covid19"],
          description: "Show the information about covid19",
          example: "covid myanmar",
          usage: "covid <country>",
     },
     run: async (bot, message, args) => {
          if (!args.length) {
               return message.channel.send("**Please give the name of country or if u want to know the global case use `covid all`**")
          }
          if (args.join(" ") === 'all') {
               let corona = await api.all()

               let embed = new Discord.MessageEmbed()
                    .setTitle("Global Cases")
                    .setColor('RANDOM')
                    .setDescription("Sometimes cases number may differ from small amount.")
                    .addField("Total Cases", corona.cases, true)
                    .addField("Total Deaths", corona.deaths, true)
                    .addField("Total Recovered", corona.recovered, true)
                    .addField("Today's Cases", corona.todayCases, true)
                    .addField("Today's Deaths", corona.todayDeaths, true)
                    .addField("Active Cases", corona.active, true)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
                    .setTimestamp();

               return message.channel.send(embed)
          }
          else {
               let corona = await api.countries({ country: args.join(" ") })

               let embed = new Discord.MessageEmbed()
                    .setTitle(`${corona.country}`)
                    .setColor('RANDOM')
                    .setDescription("Sometimes cases number may differ from small amount.")
                    .addField("Total Cases", corona.cases, true)
                    .addField("Total Deaths", corona.deaths, true)
                    .addField("Total Recovered", corona.recovered, true)
                    .addField("Today's Cases", corona.todayCases, true)
                    .addField("Today's Deaths", corona.todayDeaths, true)
                    .addField("Active Cases", corona.active, true)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
                    .setTimestamp();

               return message.channel.send(embed)
          }
     }

}