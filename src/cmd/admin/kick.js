const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "kick",
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
        var args = message.content.split(' ')
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **You Need `KICK_MEMBERS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        let member = message.mentions.users.first();
        var user = message.guild.member(member);
        if (!user) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Please Mention Same One!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!args[1]) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Please Type Reason!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        message.guild.member(user).kick(args[1], user).then(() => {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.done + ` **${user} Has Ben Kicked By <@!${message.author.id}>**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
        })
    }
};