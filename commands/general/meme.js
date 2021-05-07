const got = require('got');
const db = require('quick.db')
const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")

module.exports = {
     config: {
          name: "meme",
          aliases: ["meme"],
          description: "Sends a meme to a discord text channel",
          usage: "meme",
     },
     run: async (bot, message, args) => {
          const embed = new Discord.MessageEmbed()
          got('https://www.reddit.com/r/memes/random/.json').then(response => {
               let content = JSON.parse(response.body);
               let permalink = content[0].data.children[0].data.permalink;
               let memeUrl = `https://reddit.com${permalink}`;
               let memeImage = content[0].data.children[0].data.url;
               let memeTitle = content[0].data.children[0].data.title;
               let memeUpvotes = content[0].data.children[0].data.ups;
               let memeDownvotes = content[0].data.children[0].data.downs;
               let memeNumComments = content[0].data.children[0].data.num_comments;
               embed.setTitle(`${memeTitle}`)
               embed.setURL(`${memeUrl}`)
               embed.setImage(memeImage)
               embed.setColor('RANDOM')
               embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
               message.channel.send(embed);
          })
     }
}