const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
    "https://cdn.discordapp.com/attachments/798926497490010112/798944666762477588/PicsArt_01-13-06.00.32.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798945106409160764/PicsArt_01-13-06.02.21.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798942961655611412/PicsArt_01-13-05.52.59.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798943832401379338/PicsArt_01-13-05.57.15.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798941596015132712/1610551137976.png"
];
var x2 = [
    "تموز",
    "المسمار",
    "البيضه",
    "العمر",
    "السلحفة"
]

module.exports = {
    name: "puzzle",
    description: "Test Your Brain Hard",
    cooldown: 5,
    aliases: [""],
    time: "10",

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") return message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        var x3 = Math.floor(Math.random() * x.length);
        var puzzle = new MessageEmbed()
            .setColor(build.colors.warn)
            .setImage(`${x[x3]}`, true)
            .setDescription(build.emojis.warn + `** You Have ` + module.exports.time + `s To Type The Correct Answer!**`, true);
        message.channel.send(puzzle).then(() => {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                max: 1,
                time: module.exports.time * 1000,
                errors: ["time"]
            });
            r.catch(() => {
                return message.channel.send(new MessageEmbed()
                    .setColor(build.colors.err)
                    .setTitle(build.emojis.warn + " **Time Out!**")
                    .setDescription(`**Time is end and no one type the correct answer**`));
            });

            r.then(async collected => {
                message.channel.send(new MessageEmbed()
                    .setColor(build.colors.done)
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