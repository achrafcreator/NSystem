const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "remove-level-role",
    cooldown: 5,
    aliases: ["remove-level-role"],

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
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.err + '**Please Mentions The Role You Want To Remove**!'))
        let role = message.guild.roles.cache.find(r => r.name === args.slice(0, args.length - 1).join(" ")) || message.guild.roles.cache.get(args.slice(0, args.length - 1).join(" ")) || message.mentions.roles.first()
        if (!role) return message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.err + '**Please Mentions The Role You Want To Remove**!'))
        let array = client.settings.get(message.guild.id, "roles")
        let data = array.findIndex(obj => obj.role === role.id)
        if (data < 0) return message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.err + '**Please Mack The Level Number More Than `1`**!'))
        client.settings.delete(message.guild.id, `roles.${data}`)
        message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(`${client.build.emojis.done} **Successfully removed ${message.guild.roles.cache.get(role.id).toString()} from level ${array[data].level} 👍**`))
    }
};