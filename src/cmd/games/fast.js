const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
    "https://cdn.discordapp.com/attachments/798926497490010112/798948125607854080/2021-10-13_06__15__31.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798948132149788692/2021-10-13_06__15__50.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798948138585030656/2021-11-13_06__11__14.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798948139226628099/2021-11-13_06__11__56.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798948142732410920/2021-12-13_06__12__14.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798948145425022996/2021-12-13_06__12__26.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798948147153207316/2021-14-13_06__14__14.png7",
    "https://cdn.discordapp.com/attachments/798926497490010112/798948146418810890/2021-12-13_06__12__52.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798948145437736980/2021-12-13_06__12__36.png"
];
var x2 = [
    "نيرو",
    "القمر",
    "المحلة",
    "نار",
    "سرير",
    "قولون",
    "الأسماعيليه",
    "القاهره",
    "الأسكندر"
]

module.exports = {
    name: "fast",
    description: "Fastest Typer",
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
        var fast = new MessageEmbed()
            .setColor(client.build.colors.warn)
            .setImage(`${x[x3]}`, "_ _", true)
            .setDescription(client.build.emojis.warn + `** You Have ` + module.exports.time + `s To Type The Correct Answer!**`, true);
        message.channel.send(fast).then(() => {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                max: 1,
                time: module.exports.time * 1000,
                errors: ["time"]
            });
            r.catch(() => {
                return message.channel.send(new MessageEmbed()
                    .setColor(client.build.colors.err)
                    .setTitle(client.build.emojis.warn + " **Time Out!**")
                    .setDescription(`**Time is end and no one type the correct answer**`));
            });

            r.then(async collected => {
                message.channel.send(new MessageEmbed()
                    .setColor(client.build.colors.done)
                    .setDescription(`**${collected.first().author}** Has typed the correct answer ` + client.build.emojis.win))
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
