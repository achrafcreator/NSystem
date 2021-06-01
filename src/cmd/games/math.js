const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
    "https://cdn.discordapp.com/attachments/798926497490010112/798949965610090567/2021-21-13_06__21__41.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798950267521466398/2021-23-13_06__23__00.png",
    "https://media.discordapp.net/attachments/798926497490010112/798950456050843668/2021-23-13_06__23__41.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798950748809461770/2021-24-13_06__24__51.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798950982905888809/2021-25-13_06__25__50.png"
];
var x2 = [
    "2000",
    "26",
    "14",
    "5.3",
    "12"
]

module.exports = {
    name: "math",
    description: "Test You Brain",
    cooldown: 5,
    aliases: [""],
    time: "10",

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") return message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.client.config.bot.setting.main_prefix;
        var x3 = Math.floor(Math.random() * x.length);
        var math = new MessageEmbed()
            .setColor(client.client.config.colors.warn)
            .setImage(`${x[x3]}`, true)
            .setDescription(client.client.config.emojis.warn + `** You Have ` + module.exports.time + `s To Type The Correct Answer!**`, true);
        message.channel.send(math).then(() => {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                max: 1,
                time: module.exports.time * 1000,
                errors: ["time"]
            });
            r.catch(() => {
                return message.channel.send(new MessageEmbed()
                    .setColor(client.client.config.colors.err)
                    .setTitle(client.client.config.emojis.warn + " **Time Out!**")
                    .setDescription(`**Time is end and no one type the correct answer**`));
            });

            r.then(async collected => {
                message.channel.send(new MessageEmbed()
                    .setColor(client.client.config.colors.done)
                    .setDescription(`**${collected.first().author}** Has typed the correct answer ` + build.emojis.win))
                var points = await db.fetch(`points_${message.guild.id}_${collected.first().author.id}`);
                if (points == null) points = db.set(`points_${message.guild.id}_${collected.first().author.id}`, {
                    user: collected.first().author.id,
                    guild: collected.first().author.id,
                    points: 0
                })
                else {
                    db.add(`points_${message.guild.id}_${collected.first().author.id}.points`, 1)
                }
            }).catch(err => {
                console.log()
            })
        });
    }
};