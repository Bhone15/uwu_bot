const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Discord = require('discord.js')
const { ownerID } = require("../../owner.json")

module.exports = {
     config: {
          name: "avatar",
          aliases: ["avatar", "av", "ava"],
          description: "Show the avatar of user",
          example: "avatar @Eli",
          usage: "avatar <@user>",
     },
     run: async (bot, message, args) => {
          let user;

          if (message.mentions.users.first()) {
               user = message.mentions.users.first();
          }
          else if (args[0]) {
               user = message.guild.members.cache.get(args[0]).user;
          } else {
               user = message.author;
          }
          let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });

          const embed = new Discord.MessageEmbed()
               .setTitle(`${user.tag} avatar`)
               .setDescription(`[Avatar URL of **${user.tag}**](${avatar})`)
               .setColor('RANDOM')
               .setImage(avatar)
               .setTimestamp();

          return message.channel.send(embed);
     }
}