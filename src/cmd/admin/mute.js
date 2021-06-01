const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const millis = require('ms')
const { send } = require('process')
const chalk = require('chalk');

module.exports = {
    name: "mute",
    cooldown: 5,
    aliases: [""],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }

        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        let embed = new MessageEmbed().setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **I Can't Mute Any Member In This Server Becuse I Don't Have `MANAGE_ROLES` Permission!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed2 = new MessageEmbed().setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **Please Mention/ID Same One!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed3 = new MessageEmbed().setColor(client.build.colors.err)
            .setDescription(client.build.emojis.warn + " **WTF Are You Doing ??**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed4 = new MessageEmbed().setColor(client.build.colors.err)
            .setDescription(client.build.emojis.warn + " **WTF Are You Doing ??**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed5 = new MessageEmbed().setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **Soory I Can't Mute Same One High Than Me >_<**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        let embed6 = new MessageEmbed().setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Need `MANAGE_ROLES` Permission To Use This Command!**")
            .setFooter(`Request By ${message.author.tag}`).setTimestamp()
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embed6)
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(embed)
        let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1])
        var user = message.guild.member(member)
        if (!user) return message.channel.send(embed2)
        if (user.id === message.author.id) return message.reply(embed3)
        if (user.id === client.user.id) return message.channel.send(embed4)
        if (!message.guild.member(user).bannable) return message.reply(embed5)
        let muteRole = message.guild.roles.cache.find(n => n.name === 'Muted')
        if (!muteRole) {
            message.guild.roles.create({
                data: {
                    name: "Muted",
                }
            }).then(async(role) => {
                await message.guild.channels.cache.forEach(channel => {
                    channel.overwritePermissions([{
                        id: role.id,
                        deny: ["SEND_MESSAGES"]
                    }]);
                })
            })
        }
        user.roles.add(muteRole).catch((err) => {
            let embed8 = new MessageEmbed().setColor(client.build.colors.err)
                .setDescription(`**Error**`)
                .setDescription(`Error: ${err.message}`)
                .setTimestamp()
            return message.channel.send(embed8)
        })
        var time = args[1]
        if (!time) time = '24h'
        message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.done + ` **${user} Has Ben Muted By <@!${message.author.id}>**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
        setTimeout(() => {
            user.roles.remove(muteRole);
        }, millis(time));
        return;
    }
};