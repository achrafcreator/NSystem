const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "unmute",
    cooldown: 5,
    aliases: [""],

    run: async(client, message) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err)
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **You Need `MANAGE_ROLES` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp())
        let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1])
        let user = message.guild.member(member)
        if (!user) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Please Mention/ID Same One!**").setFooter(`Request By ${message.author.tag}`).setTimestamp())
        if (user.id === message.author.id) return message.reply(new MessageEmbed().setColor(client.build.colors.err).setDescription(lodeing + " **WTF Are You Doing ??**").setFooter(`Request By ${message.author.tag}`).setTimestamp())
        if (!message.guild.member(user).bannable) return message.reply(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **I Can't Unmute one high than me >_<**").setFooter(`Request By ${message.author.tag}`).setTimestamp())
        var muteRole = message.guild.roles.cache.find(n => n.name === 'Muted')
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
        user.roles.remove(muteRole)
        message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.done + ` **${user} Has Ben Unmuted By <@!${message.author.id}>**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
    }
};