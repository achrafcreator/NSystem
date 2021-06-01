const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "support",
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
        return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.warn)
            .setDescription(
                `**[Click Here To Invite ${client.user.username}](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1513618815)\n\n[Support Server!](${client.config.dev.support || "https://discord.gg/YJ6mUdgTsc"})\n\n[Bot WebSite!](${client.config.dev.website || "https://discord.gg/YJ6mUdgTsc"})**`
            )
        )
    }
};