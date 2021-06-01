const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "clear",
    cooldown: 5,
    aliases: [""],

    run: async(client, message) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **You Need `MANAGE_GUILD` Permission To Use This Command!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());
        if (!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **I Can't Clear The Cahct In This Server Becuse I Don't Have `MANAGE_GUILD` Permission!**").setFooter(`Request By ${message.author.tag}`).setTimestamp());

        let args = message.content.split(" ").slice(1)
        let messagecount = parseInt(args);
        if (args > 100) return message.channel.send(`\`\`\`javascript
i cant delete more than 100 messages\`\`\``).then(messages => messages.delete(5000))
        if (!messagecount) messagecount = '100';
        message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(messages => {
            message.channel.send(new MessageEmbed().setDescription(`\`\`\`javascript
${messages.size} messages cleared\`\`\``)).then(messages =>
                messages.delete({ timeout: 5000 }));
        })
    }
};