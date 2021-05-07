
const db = require('quick.db')
const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")

const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
var aq = require('animequote');
const fetch = require("node-fetch")

module.exports = {
     config: {
          name: "anime",
          aliases: ["anime", "ani"],
          description: "Get the information about any anime",
          example: "anime naruto",
          usage: "anime <anime name>",
     },
     run: async (bot, message, args) => {
          if (!args[0]) {
               return message.channel.send("Please Give us the name of anime");

          }
          //main part
          var search = message.content.split(/\s+/g).slice(1).join(" ");
          kitsu.searchAnime(search).then(async result => {
               if (result.length === 0) {
                    return message.channel.send(`No results found for **${search}**!`);
               }

               var anime = result[0]

               let embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                    .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                    .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                    .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                    .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)

                    .setThumbnail(anime.posterImage.original, 100, 200);


               return message.channel.send({ embed })
          }).catch(err => {
               console.log(err) //cathing error
               return message.channel.send(`No results found for **${search}**!`);
          });
     }

}

