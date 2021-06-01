const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');
const { gifVersion } = require('canvas');

module.exports = {
    name: "role",
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
        let member = message.mentions.users.first() || client.users.cache.get(message.content.split(' ')[1]);
        var user = message.guild.member(member);
        var role = message.mentions.roles.first();
        if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.channel.send(new MessageEmbed().setDescription(client.build.emojis.err + " **You Need `MANAGE_ROLES` Permission To Use This Command!**").setColor(client.build.colors.err))
        if (!user) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Please Mention/ID Same One!**"))
        if (!role) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Please Mention The Role!**"))
        user.roles.add(role.id).then(() => {
            message.channel.send(
                new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.done + " **Done Give's <@!" + user.id + "> The <@&" + role.id + "> Role**")
            )
        })
    }
};