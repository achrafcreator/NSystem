const { MessageEmbed, Invite } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "invite",
    cooldown: 5,
    aliases: [""],

    run: async(client, message) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        var args = message.content.split(' ')
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        if (!args[1]) return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(
                `**${client.build.emojis.err} Please Type The Invite Age With Hours!**`
            )
        )
        if (isNaN(args[1])) return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(
                `**${client.build.emojis.err} Invite Age Have To Be A Number!**`
            )
        )
        if (args[1] > 10) return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(
                `**${client.build.emojis.err} Invite Age Is To Long!**`
            )
        )
        if (!args[2]) return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(
                `**${client.build.emojis.err} Please Type The Invite Uses!**`
            )
        )
        if (isNaN(args[2])) return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(
                `**${client.build.emojis.err} Invite Uses Have To Be A Number!**`
            )
        )
        let invite = await message.channel.createInvite({
                maxAge: args[1] * 60 * 1000,
                maxUses: args[2]
            },
            `Requested with command by ${message.author.tag}`
        )
        message.channel.send(invite, '_ _')
    }
};