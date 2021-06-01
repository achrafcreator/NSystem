const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "set-level-channel",
    cooldown: 5,
    aliases: ["set-level-channel"],

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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + ' You Need `ADMINISTRATOR` To Use This Command!')).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000);
        })
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Please Mention The Levels Channel!**"))
        let channel = message.guild.channels.cache.find(c => c.name === args[0]) || message.mentions.channels.first()
        if (!channel) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + ' **I Can\' This Channel!**'))
        client.settings.set(message.guild.id, channel.id, "channel")
        message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.done + '** Successfully updated level ups to be sent in `' + channel.name + '` 👍**'))
    }
};