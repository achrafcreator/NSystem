const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "ban",
    cooldown: 5,
    aliases: [""],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err)
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
        var user = message.guild.member(member);
        var reason = args[1];
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **I Can't Bannd Any Member In This Server Becuse I Don't Have `BAN_MEMBERS` Permission!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **You Need `BAN_MEMBERS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!user) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Please Mention/ID Same One!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!reason) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Please Type Reason!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        user.ban({ reason: reason }).then(() => {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.done + ` **${user} banned from the server ! :airplane: by:<@${message.author.id}> **`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
        })
    }
};