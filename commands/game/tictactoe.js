const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")
const { tictactoe } = require('reconlx')

module.exports = {
     config: {
          name: "tictactoe",
          aliases: ["ttt", "tic"],
          description: "Play tic tac toe against another user",
          example: "ttt @Eli",
          usage: "tictactoe <@user>",
     },
     run: async (bot, message, args) => {
          const challenger = message.member;
          const oppenent = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
          if (!oppenent) return message.channel.send('Please specify a user to play against!');

          const question = await message.channel.send(`${oppenent}, would you like to play tic tac toe against ${challenger}?`);
          ["✅", "❌"].forEach(async el => await question.react(el));

          const filter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === oppenent.id;

          const response = await question.awaitReactions(filter, { max: 1 });

          const reaction = response.first();

          if (reaction.emoji.name === "❌") return question.edit("Looks like they didn't want to play");
          else {
               new tictactoe({
                    player_two: oppenent,
                    message: message,
               })

          }
     }
}