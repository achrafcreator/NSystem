const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "unlock",
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
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **You Need `MANAGE_MESSAGES` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp())
        message.channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        }).then(() => {
            message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription("🔓 **has been unlocked.**").setFooter(`Request By ${message.author.tag}`).setTimestamp())
        });
    }
};