const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "files-only",
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
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + ' You Need `ADMINISTRATOR` To Use This Command!')).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000);
        })
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + ' Plase Mention The Channel!'))
        let channel = message.guild.channels.cache.find(c => c.name === args[0]) || message.mentions.channels.first()
        if (!channel) return message.channel.send('?')
        let array = client.settings.get(message.guild.id, "imagechannel")
        if (array.includes(channel.id)) {
            let index = array.findIndex(obj => obj === channel.id)
            client.settings.delete(message.guild.id, `imagechannel.${index}`)
            message.channel.send(new MessageEmbed().setDescription(`\`\`\`py\n"Removed ${channel.name} to be image only."\`\`\``))
            return;
        }
        client.settings.push(message.guild.id, channel.id, "imagechannel")
        message.channel.send(new MessageEmbed().setDescription(`\`\`\`py\n"Set ${channel.name} to be image only."\`\`\``))
    }
};