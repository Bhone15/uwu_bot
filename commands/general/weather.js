const db = require('quick.db')
const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")
const weather = require('weather-js');

module.exports = {
     config: {
          name: "weather",
          aliases: ["wea", "weather"],
          description: "Show the information about weather condition",
          example: "weather yangon",
          usage: "weather <city>",
     },
     run: async (bot, message, args) => {
          let city = args.join(" ");
          let degreetype = "C";

          await weather.find({ search: city, degreeType: degreetype }, function (err, result) {
               if (!city) return message.channel.send("**Please insert the city.**");
               if (err || result === undefined || result.length === 0)
                    return message.channel.send("**Unknown city. Please try again.**");
               let current = result[0].current;
               let location = result[0].location;

               const embed = new Discord.MessageEmbed()
                    .setAuthor(current.observationpoint)
                    .setColor('RANDOM')
                    .setDescription(`>${current.skytext}`)
                    .setThumbnail(current.imageUrl)
                    .setTimestamp()
                    .addField("Latitude", location.lat, true)
                    .addField("Longitude", location.long, true)
                    .addField("Feels Like", `${current.feelslike}° Degrees`, true)
                    .addField("Degree Type", location.degreetype, true)
                    .addField("Humidity", `${current.humidity}%`, true)
                    .addField("Timezone", `GMT ${location.timezone}`, true)
                    .addField("Temperature", `${current.temperature}°Degrees`)
                    .addField("Observation Time", current.observationtime, true)

               return message.channel.send(embed);
          })
     }
}