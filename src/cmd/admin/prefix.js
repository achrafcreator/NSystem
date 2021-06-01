const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "set-prefix",
    cooldown: 5,
    aliases: ["prefix"],
    help: ``,

    run: async(client, message) => {
        if (!message.guild || message.author.bot) return;
        var args = message.content.toLowerCase().split(' ');
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor("RED").setDescription('❌ You Need `ADMINISTRATOR` To Use This Command!')).then(m => {
            setTimeout(() => {
                m.delete()
            }, 3000);
        })
        if (!args[1]) {
            message.channel.send(
                new MessageEmbed()
                .setColor(client.build.colors.err)
                .setAuthor(client.build.emojis.err + "Erorr")
                .setDescription("**Please Type The New Prefix!**")
            )
            return;
        }
        await db.set(`prefix_${message.guild.id}`, `${args[1]}`);
        message.channel.send(
            new MessageEmbed()
            .setColor(client.build.colors.done)
            .setAuthor(`${client.build.emojis.done} Done`, `${message.author.avatarURL({ dynamic: true })}`)
            .setDescription(`**The new prefix is: ${args[1]}**`)
        )
    }
};