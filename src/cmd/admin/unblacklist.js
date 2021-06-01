const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "unblacklist",
    cooldown: 5,
    aliases: ["unblack", "unlist"],

    run: async(client, message) => {
        let args = message.content.split(" ");
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        if (!client.config.dev.owner_id.includes(message.author.id)) {
            message.channel.send(
                new MessageEmbed()
                .setAuthor("❌ Erorr")
                .setDescription("**Only Bot Owners [" + client.config.dev.owner_id + "] Can Use This Command**")
            )
            return;
        }
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
        let Blacklist = await db.fetch(`Blacklist_${user.id}`);
        if (Blacklist === null) Blacklist = "off";
        if (!user) {
            message.channel.send(
                new MessageEmbed()
                .setAuthor('❌ Error')
                .setDescription("**Please Mention Sameone!**")
            )
            return;
        }
        message.channel.send(
            new MessageEmbed()
            .setAuthor("✅ Done")
            .setDescription("**" + user.tag + " Has Been Removed To The Black list!**")
        );

        db.set(`Blacklist_${user.id}`, "off");
    }
};