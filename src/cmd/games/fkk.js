const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

var x = [
    "https://media.discordapp.net/attachments/798926497490010112/798926550124462110/2021-47-13_04__47__35.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798926555040055296/2021-43-13_04__43__14.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798926555811282954/2021-45-13_04__45__08.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798926559041814528/2021-45-13_04__45__27.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798926546609242162/2021-47-13_04__47__18.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798926561549615174/2021-45-13_04__45__42.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798926565554913290/2021-45-13_04__45__50.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798926564728635402/2021-46-13_04__46__05.png",
    "https://cdn.discordapp.com/attachments/798926497490010112/798926565475876874/2021-47-13_04__47__06.png"
];
var x2 = [
    "ا ل ق م د",
    "ا ل ق م ر",
    "ح م ا د ه",
    "ا ل ف ر ع و ن",
    "ا خ و ا ت ي",
    "م ع ك ر و ن ه",
    "ب ي ض",
    "ا ل م و ت",
    "ن ي ر و"
]

module.exports = {
    name: "fkk",
    description: "The Fastest Decoder",
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
        var fkk = new MessageEmbed()
            .setColor(client.build.colors.warn)
            .addField(`${x[x3]}`, "_ _", true)
            .setDescription(client.build.emojis.warn + `** You Have ` + module.exports.time + `s To Type The Correct Answer!**`, true);
        message.channel.send(fkk).then(() => {
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