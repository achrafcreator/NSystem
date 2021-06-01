const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "add-level-role",
    cooldown: 5,
    aliases: ["add-lrole", "add-levelr"],

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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + 'You Need `ADMINISTRATOR` To Use This Command!')).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000);
        })
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + '**Please Mention The Role!**'))
        if (!args[args.length - 1]) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + '**Please Type The Level!**'))
        let role = message.guild.roles.cache.find(r => r.name === args.slice(0, args.length - 1).join(" ")) || message.guild.roles.cache.get(args.slice(0, args.length - 1).join(" ")) || message.mentions.roles.first()
        if (!role) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + '**This Isn\'t Role!**'))
        if (isNaN(args[args.length - 1])) message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + '**The Level Have To Be A Number!**'))
        let array = client.settings.get(message.guild.id, "roles")
        let data = array.findIndex(obj => obj.level === parseInt(args[args.length - 1]))
        let data2 = array.findIndex(obj => obj.role === message.guild.roles.cache.get(role.id).name)
        if (data2 > -1) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + '**This Level Has Been Added Befor!**'))
        if (data > -1) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + '**This Role Has Been Added Befor!**'))
        client.settings.push(message.guild.id, { level: parseInt(args[args.length - 1]), role: role.id }, "roles")
        message.channel.send(new MessageEmbed().setColor(client.build.colors.done).setDescription(client.build.emojis.done + `Successfully added ${message.guild.roles.cache.get(role.id).toString()} to level ${args[args.length-1]} 👍`))
    }
}