const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "slow-mode",
    cooldown: 5,
    aliases: [""],

    run: async(client, message) => {
        let args = message.content.split(' ')
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        if (!args[1]) return message.channel.send(
            new MessageEmbed()
            .setDescription(
                `**\`\`\`py\n"Please Type The SlowMode Time With Sucands!"\`\`\`**`
            )
            .setFooter("Requested By " + message.author.tag)
            .setTimestamp()
        )
        if (isNaN(args[1])) return message.channel.send(
            new MessageEmbed()
            .setDescription(
                `**\`\`\`py\n"What You Are Thinking When You Type ${args[1]} To Be A SlowMode Time?"\`\`\`**`
            )
            .setFooter("Requested By " + message.author.tag)
            .setTimestamp()
        )
        message.channel.send(new MessageEmbed().setDescription('**\`\`\`cs\n# ' + message.channel.name + ' Channel get\'s a Cooldown With ' + args[1] + 's ✅\`\`\`**').setFooter("Requested By " + message.author.tag).setTimestamp())
        message.channel.setRateLimitPerUser(args[1])
    }
};