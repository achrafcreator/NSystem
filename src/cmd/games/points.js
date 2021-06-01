const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
        name: "points",
        description: "See Your Points",
        cooldown: 5,
        aliases: [""],

        run: async(client, message, args) => {
                let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
                if (Blacklist === "on") return message.channel.send(new MessageEmbed()
                    .setColor(client.build.colors.err)
                    .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
                var prefix = await db.fetch(`prefix_${message.guild.id}`);
                if (prefix == null) prefix = client.config.bot.setting.main_prefix;
                message.channel.send(new MessageEmbed()
                        .setColor(client.build.colors.done)
                        .setAuthor(message.author.tag + " - Points! " + build.emojis.done)
                        .setDescription(`<@!${message.author.id}> Points Is : \`${db.get(`points_${message.guild.id}_${message.author.id}.points`)}\``)
      .setFooter("Requested By " + message.author.tag)
      .setTimestamp()
    )
  }
};