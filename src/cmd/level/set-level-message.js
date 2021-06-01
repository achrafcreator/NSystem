const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "set-level-message",
    cooldown: 5,
    aliases: ["set-level-message"],

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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + ' **You Need `ADMINISTRATOR` To Use This Command!**')).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000);
        })
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + ' **Please Type The Level Up Message! \n\`{level}\` => To Show The User Level\n\`{user}\` => To Mention The User!**'))
        let text = args.join(' ')
        if (text.length > 1800) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **Soory But This Message Is To Long!**"))
        client.settings.set(message.guild.id, text, "message")
        message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.done + ' **Done Set The New LevelUp Message!**'))
    }
};