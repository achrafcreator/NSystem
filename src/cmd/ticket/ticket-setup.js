const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "ticket-setup",
    cooldown: 5,
    aliases: ["ticket-setup"],

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
        if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(
                new MessageEmbed().setDescription(`**Error** I Don\'t have MANAGE_CHANNELS Permission to do this`)
            );
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(new MessageEmbed().setDescription(client.build.emojis.err + " **You Need `MANAGE_CHANNELS` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        let channel = message.mentions.channels.first();
        if (!channel) return message.channel.send(new MessageEmbed().setAuthor('The use is wrong!').setDescription(`**the useg : ${prefix}ticket-setup #channel**`).setColor("BLUE"));

        let sent = await channel.send(new MessageEmbed()
            .setTitle("**Ticket System**")
            .setDescription("**React With 📩 To Create a Ticket**")
            .setColor(client.build.colors.warn)
        );
        sent.react('📩');
        client.ticket.set(`${message.guild.id}-ticket`, sent.id);
        message.channel.send("**Ticket System Setup Done :>**")
    }
};