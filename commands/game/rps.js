const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")

module.exports = {
     config: {
          name: "Rock Paper Scissors",
          aliases: ["rps"],
          description: "Play Rock Paper Scissor with me",
          example: "rps rock",
          usage: "rps <rock, paper, scissors>",
     },
     run: async (bot, message, args) => {
          const botChoice = Math.floor(Math.random() * (4 - 1)) + 1;
          let botEmoji;
          let playerEmoji;
          let botChoiceStr;

          if (!args[0]) return message.channel.send('You need to state your choice. rock, paper or scissors.')
          if (!['rock', 'paper', 'scissors'].includes(args[0]))
               return message.channel.send('Your choice was not one the options: rock, paper, scissors.')

          if (botChoice == 1) {
               botChoiceStr = 'rock';
               botEmoji = ':rock: Rock';
          };
          if (botChoice == 2) {
               botChoiceStr = 'paper';
               botEmoji = ':newspaper: Paper';
          };
          if (botChoice == 3) {
               botChoiceStr = 'scissors';
               botEmoji = ':scissors: Scissors';
          };

          if (args[0] == 'rock') {
               playerEmoji = ':rock: Rock';
          }
          if (args[0] == 'paper') {
               playerEmoji = ':newspaper: Paper';
          }
          if (args[0] == 'scissors') {
               playerEmoji = ':scissors: Scissors';
          }

          if (botChoiceStr == args[0])
               return message.channel.send(`I picked: ${botEmoji}, you picked: ${playerEmoji}. We tied.`)
          if (args[0] == 'rock') {
               if (botChoiceStr == 'paper')
                    return message.channel.send(`I picked: ${botEmoji}, you picked: ${playerEmoji}. You lost.`)
               else
                    return message.channel.send(`I picked: ${botEmoji}, you picked: ${playerEmoji}. You won.`)
          } else if (args[0] == 'paper') {
               if (botChoiceStr == 'scissors')
                    return message.channel.send(`I picked: ${botEmoji}, you picked: ${playerEmoji}. You lost.`)
               else
                    return message.channel.send(`I picked: ${botEmoji}, you picked: ${playerEmoji}. You won.`)
          } else if (args[0] == 'scissors') {
               if (botChoiceStr == 'rock')
                    return message.channel.send(`I picked: ${botEmoji}, you picked: ${playerEmoji}. You lost.`)
               else
                    return message.channel.send(`I picked: ${botEmoji}, you picked: ${playerEmoji}. You won.`)
          }
     }
}