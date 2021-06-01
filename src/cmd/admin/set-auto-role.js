const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "set-auto-role",
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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.err + 'You Need `ADMINISTRATOR` To Use This Command!')).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000);
        })
        var role = message.mentions.roles.first();
        if (!role) return message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(
                `**${client.build.emojis.err}  Please Mention The Auto Role!**`
            )
        )
        message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.done)
            .setDescription(
                `**${client.build.emojis.done} Done Set The Auto Role!**`
            )
        )
        db.set(`Auto_Role_${message.guild.id}`, {
            arole: role
        })
    }
};