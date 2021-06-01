const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "hide",
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
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + '** You dont have `MANAGE_CHANNELS` permission **').setFooter(`Request By ${message.author.tag}`).setTimestamp());
        let everyone = message.guild.roles.cache.find(niro => niro.name === '@everyone');
        message.channel.createOverwrite(everyone, {
            VIEW_CHANNEL: false
        }).then(() => {
            const embed = new MessageEmbed()
                .setColor(client.build.colors.done)
                .setDescription(`${client.build.emojis.done} **Done Hide ${message.channel} Room**`)
                .setFooter(`Request By ${message.author.tag}`).setTimestamp()
            message.channel.send(embed)
        })
    }
};