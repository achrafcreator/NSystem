const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "unban",
    cooldown: 5,
    aliases: [""],

    run: async(client, message) => {
        try {
            let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
            if (Blacklist === "on") {
                message.channel.send(new MessageEmbed()
                    .setColor(client.build.colors.err)
                    .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
                return;
            }
            var prefix = await db.fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = client.config.bot.setting.main_prefix;
            let args = message.content.split(' ')
            if (args[1] === "all") {
                if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new MessageEmbed().setDescription(client.build.emojis.err + " **You Need `BAN_MEMBERS` Permission To Use This Command!**"));
                message.guild.fetchBans().then(bans => {
                    if (bans.size == 0) {
                        message.reply(
                            new MessageEmbed()
                            .setColor(client.build.colors.err)
                            .setDescription(
                                `**${client.build.emojis.err} Thare Is No Bannded Members!**`
                            )
                        );
                    };
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                        let una = bans.size;
                        message.channel.send(
                            new MessageEmbed()
                            .setColor(client.build.colors.done)
                            .setDescription(
                                `**${client.build.emojis.done} Done Unbaned ${una} Members!**`
                            )
                        )
                    });
                })
            } else if (args[1] !== "all") {
                if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new MessageEmbed().setDescription(client.build.emojis.err + " **You Need `BAN_MEMBERS` Permission To Use This Command!**"));
                let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]) || client.users.cache.get(message.content.split(' ')[0]) || client.users.cache.get(message.content.split(' ')[2]);
                var user = message.guild.member(member);
                if (!user || !member) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`${client.build.emojis.err} **Please Type Preson ID You Want to Unabn!**`));
                message.guild.unban(user);
                message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.done + `This User ${user} Has Ben Unbanned By <@!${message.author.id}>`).setFooter(`Request By ${message.author.tag}`).setTimestamp()).catch(err => console.log(err))
            }
        } catch (e) {
            throw e;
            console.log(e)
        }
    }
};