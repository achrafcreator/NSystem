const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "avatar",
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
        var user = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
        if (!user) user = message.author
        message.channel.send(
            new MessageEmbed()
            .setAuthor(message.author.tag, user.avatarURL({ dynamic: true }))
            .setDescription(`**[Avatar Link](${user.avatarURL()})**`)
            .setImage(user.avatarURL({ dynamic: true }))
            .setColor(client.build.colors.done)
            .setFooter(`Requested by ${message.author.tag}`, user.avatarURL({ dynamic: true }))
        )
    }
}