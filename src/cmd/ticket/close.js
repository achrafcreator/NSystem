const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "close",
    cooldown: 5,
    aliases: ["end-ticket"],

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
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **You Need `MANAGE_CHANNELS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!message.channel.name.includes("ticket-")) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setTitle(client.build.emojis.err + " **You cannot use that here!**"))
        message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setAuthor(client.build.emojis.done + " Channel Well Deleted in 5 seconds")).then(m => {
            setTimeout(() => {
                m.delete()
                message.channel.delete();
            }, 6000)
        })
    }
};