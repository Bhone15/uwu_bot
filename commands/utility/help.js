var Discord = require('discord.js')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");

module.exports = {
     config: {
          name: "help",
          description: "Help Menu",
          usage: "1) help \n2) help [module name]\n3) help [command (name or alias)]",
          example: "1) help\n2) help utility\n3) help ban",
          aliases: ['h']
     },
     run: async (bot, message, args) => {
          let prefix;
          if (message.author.bot || message.channel.type === "dm") return;
          try {
               let fetched = await db.fetch(`prefix_${message.guild.id}`);
               if (fetched == null) {
                    prefix = PREFIX
               } else {
                    prefix = fetched
               }
          } catch (e) {
               console.log(e)
          };

          if (message.content.toLowerCase() === `${prefix}help`) {
               var log = new Discord.MessageEmbed()
                    .setTitle("**Help Menu: Main**")
                    .setColor(`RANDOM`)
                    .addField(`**<a:mod:836904243730055228>Moderation**`, `[ \`${prefix}help mod\` ]`, true)
                    .addField(`**<a:settings:836903232696614932>Utility**`, `[ \`${prefix}help utility\` ]`, true)
                    .addField(`**<a:general:836904358691733547>General**`, `[ \`${prefix}help general\` ]`, true)
                    .addField(`**<a:832814270638981221:837159822893383702>Game**`, `[ \`${prefix}help game\` ]`, true)

               message.channel.send(log);
          }
          else if (args[0].toLowerCase() === "mod") {
               var commandArray = "1) Ban \n2) Kick\n3) Whois\n4) Unban\n5) Warn\n6) Mute\n7) Purge\n8) Slowmode \n9) Nick \n10) Roleinfo"
               var commandA2 = "11) Rolememberinfo\n12) Setmodlog\n13) Disablemodlog \n14) Dm\n15) Lock (Lock the channel)\n16) Unlock (Unlock the channel)"

               pageN1 = "**\n<a:832989426816253993:836926229361590293>Commands: **\n`\`\`js\n" + commandArray + "\`\`\`";
               pageN2 = "**\n<a:832989426816253993:836926229361590293>Commands: **\n`\`\`js\n" + commandA2 + "\`\`\`";

               let pages = [pageN1, pageN2]
               let page = 1

               var embed = new Discord.MessageEmbed()
                    .setTitle('**Help Menu: [Moderation]<a:mod:836904243730055228>**')
                    .addField(`${prefix}help command for more info`, 'E.g. `;help ban`')
                    .setColor("RANDOM") // Set the color
                    .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                    .setDescription(pages[page - 1])


               message.channel.send({ embed }).then(msg => {
                    msg.react('⬅').then(r => {
                         msg.react('➡')

                         // Filters
                         const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id
                         const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id

                         const backwards = msg.createReactionCollector(backwardsFilter, { timer: 6000 })
                         const forwards = msg.createReactionCollector(forwardsFilter, { timer: 6000 })

                         backwards.on('collect', (r, u) => {
                              if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                              page--
                              embed.setDescription(pages[page - 1])
                              embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                              msg.edit(embed)
                              r.users.remove(r.users.cache.filter(u => u === message.author).first())
                         })

                         forwards.on('collect', (r, u) => {
                              if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first())
                              page++
                              embed.setDescription(pages[page - 1])
                              embed.setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                              msg.edit(embed)
                              r.users.remove(r.users.cache.filter(u => u === message.author).first())
                         })


                    })
               })
          }

          else if (args[0].toLowerCase() === "utility") {
               var embed = new Discord.MessageEmbed()
                    .setTitle('**Help Menu: [Utility]**')
                    .setColor("RANDOM") // Set the color
                    .setDescription("```" + `1) Prefix [${prefix}help prefix for more info]\n2) Help [${prefix}help for more info]` + "```")

               return message.channel.send(embed);
          } else if (args[0].toLowerCase() === "general") {
               var commandArray = "1) Ping \n2) Avatar\n3) Meme\n4) Covid\n5) Weather\n6) Translate\n7) Anime\n8) Kiss \n9) Hug \n10) 8ball";
               pageN1 = "**\n<a:832989426816253993:836926229361590293>Commands: **\n`\`\`js\n" + commandArray + "\`\`\`";

               let pages = [pageN1]
               let page = 1

               var embed = new Discord.MessageEmbed()
                    .setTitle('**Help Menu: [general]<a:general:836904358691733547>**')
                    .setColor("RANDOM")
                    .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                    .setDescription(pages[page - 1])
                    .addField(`${prefix}help command for more info`, 'E.g. `;help ping`')


               return message.channel.send(embed);
          }
          else if (args[0].toLowerCase() === "game") {
               var commandArray = "1) Connect four \n2) Tictactoe \n3) Rock Paper Scissors";
               pageN1 = "**\n<a:832989426816253993:836926229361590293>Commands: **\n`\`\`js\n" + commandArray + "\`\`\`";

               let pages = [pageN1]
               let page = 1

               var embed = new Discord.MessageEmbed()
                    .setTitle('**Help Menu: [game]<a:832814270638981221:837159822893383702>**')
                    .setColor("RANDOM")
                    .setFooter(`Page ${page} of ${pages.length}`, bot.user.displayAvatarURL())
                    .setDescription(pages[page - 1])
                    .addField(`${prefix}help command for more info`, 'E.g. `;help connectfour`')

               return message.channel.send(embed);
          }

          else {
               const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
                    .setThumbnail(bot.user.displayAvatarURL())

               let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
               if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
               command = command.config

               embed.setDescription(stripIndents`
    ** Command -** [    \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`   ]\n
    ** Description -** [    \`${command.description || "No Description provided."}\`   ]\n
    ** Usage -** [   \`${command.usage ? `\`${command.usage}\`` : "No Usage"}\`   ]\n
    ** Examples -** [   \`${command.example ? `\`${command.example}\`` : "No Examples Found"}\`   ]\n
    ** Aliases -** [   \`${command.aliases ? command.aliases.join(" , ") : "None."}\`   ]`)
               embed.setFooter(message.guild.name, message.guild.iconURL())

               return message.channel.send(embed)
          }



     }

}