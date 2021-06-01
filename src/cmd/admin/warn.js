const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "warn",
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
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply("_ _")
        let user = message.mentions.users.first();
        if (!user) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**:rolling_eyes: I can't find this member**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
        let reason = message.content.split(" ").slice(2).join(" ");
        if (!reason) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(`**:rolling_eyes: Please specify a reason.**`).setFooter(`Request By ${message.author.tag}`).setTimestamp())
        var warns = await db.fetch(`warns_${message.guild.id}_${message.author.id}`);
        if (warns == null) db.set(`warns_${message.guild.id}_${message.author.id}`, {
            warns: 0
        })
        if (warns == 3) {
            message.guild.owner.send(`<@!${user.id}> Has Benn Rished 3 Warns!`)
        }
        if (warns == 10) {
            message.guild.owner.send(`<@!${user.id}> Has Benn Rished 10 Warns!`)
        }
        if (warns == 15) {
            message.guild.owner.send(`<@!${user.id}> Has Benn Rished 15 Warns!`)
        }
        if (warns == 20) {
            message.guild.owner.send(`<@!${user.id}> Has Benn Rished 20 Warns!`)
        }
        if (warns == 25) {
            message.guild.owner.send(`<@!${user.id}> Has Benn Rished 25 Warns!`)
        }
        db.add(`warns_${message.guild.id}_${message.author.id}.warns`, 1)
        user.send(
            new MessageEmbed()
            .addField('**:warning: You were warned!**', reason)
            .setFooter(message.guild.name, message.guild.iconURL()).setTimestamp().setColor(client.build.colors.warn)
        ).catch(err => console.error(err))
        message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.warn)
            .setDescription(`${client.build.emojis.done} **Done Warned <@!${user.id}>**`)
        )
        return;
    }
};