const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');

module.exports = {
    name: "createcolors",
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
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(new MessageEmbed().setColor(client.build.colors.err).setDescription(client.build.emojis.err + " **I Can't Mute Any Member In This Server Becuse I Don't Have `MANAGE_ROLES` Permission!**").setFooter(`Request By ${message.author.tag}`).setTimestamp())
        message.guild.roles.create({
            data: {
                name: "1",
                color: "#FFB6C1",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "2",
                color: "#FFC0CB",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "3",
                color: "#FF69B4",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "4",
                color: "#FF1493",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "5",
                color: "#DB7093",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "6",
                color: "#C71585",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "7",
                color: "#E6E6FA",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "8",
                color: "#D8BFD8",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "8",
                color: "#DDA0DD",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "9",
                color: "#DA70D6",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "10",
                color: "#EE82EE",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "11",
                color: "#FF00FF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "12",
                color: "#BA55D3",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "13",
                color: "#9932CC",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "14",
                color: "#9400D3",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "15",
                color: "#8A2BE2",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "16",
                color: "#8B008B",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "17",
                color: "#800080",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "18",
                color: "#9370DB",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "19",
                color: "#7B68EE",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "20",
                color: "#6A5ACD",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "21",
                color: "#483D8B",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "22",
                color: "#663399",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "23",
                color: "#4B0082",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "24",
                color: "#FFA07A",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "25",
                color: "#FA8072",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "26",
                color: "#E9967A",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "27",
                color: "#F08080",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "28",
                color: "#CD5C5C",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "29",
                color: "#DC143C",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "30",
                color: "	#FF0000",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "31",
                color: "#B22222",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "32",
                color: "#8B0000",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "33",
                color: "#FFA500",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "34",
                color: "#FF8C00",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "35",
                color: "#FF7F50",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "36",
                color: "#FF6347",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "37",
                color: "#FF4500",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "38",
                color: "#FFD700",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "39",
                color: "#FFFFE0",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "40",
                color: "#FFFACD",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "41",
                color: "#FAFAD2",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "42",
                color: "	#FFEFD5",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "43",
                color: "#FFE4B5",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "44",
                color: "#FFDAB9",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "45",
                color: "#EEE8AA",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "46",
                color: "#F0E68C",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "47",
                color: "#BDB76B",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "48",
                color: "#ADFF2F",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "49",
                color: "#7FFF00",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "50",
                color: "#7CFC00",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "51",
                color: "#00FF00",
                permissions: []
            }
        })

        message.guild.roles.create({
            data: {
                name: "52",
                color: "#32CD32",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "53",
                color: "#98FB98",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "54",
                color: "#90EE90",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "55",
                color: "#00FA9A",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "56",
                color: "#00FF7F",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "57",
                color: "#3CB371",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "58",
                color: "#2E8B57",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "59",
                color: "#2E8B57",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "60",
                color: "#008000",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "61",
                color: "#006400",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "62",
                color: "#9ACD32",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "63",
                color: "#6B8E23",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "64",
                color: "#556B2F",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "65",
                color: "#66CDAA",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "66",
                color: "#8FBC8F",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "67",
                color: "#20B2AA",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "68",
                color: "#008B8B",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "69",
                color: "#008080",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "70",
                color: "#00FFFF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "71",
                color: "#E0FFFF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "72",
                color: "#AFEEEE",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "73",
                color: "#7FFFD4",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "74",
                color: "#40E0D0",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "75",
                color: "#48D1CC",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "76",
                color: "#00CED1",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "77",
                color: "#5F9EA0",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "78",
                color: "#4682B4",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "79",
                color: "#B0C4DE",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "80",
                color: "#ADD8E6",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "81",
                color: "#B0E0E6",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "82",
                color: "#87CEFA",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "83",
                color: "#87CEEB",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "84",
                color: "#6495ED",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "85",
                color: "#00BFFF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "86",
                color: "#1E90FF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "87",
                color: "#4169E1",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "88",
                color: "#0000FF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "89",
                color: "#0000CD",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "90",
                color: "#00008B",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "91",
                color: "#000080",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "92",
                color: "#191970",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "93",
                color: "#FFF8DC",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "94",
                color: "#FFEBCD",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "95",
                color: "#FFE4C4",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "96",
                color: "#FFDEAD",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "97",
                color: "#F5DEB3",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "98",
                color: "#DEB887",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "99",
                color: "#D2B48C",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "100",
                color: "#BC8F8F",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "101",
                color: "#F4A460",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "102",
                color: "#DAA520",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "103",
                color: "#B8860B",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "104",
                color: "#CD853F",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "105",
                color: "#D2691E",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "106",
                color: "#808000",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "107",
                color: "#8B4513",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "108",
                color: "#A0522D",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "109",
                color: "#A52A2A",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "110",
                color: "#800000",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "111",
                color: "#FFFFFF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "112",
                color: "#FFFAFA",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "113",
                color: "#F0FFF0",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "114",
                color: "#F5FFFA",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "115",
                color: "#F0FFFF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "116",
                color: "#F0F8FF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "117",
                color: "#F8F8FF",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "118",
                color: "#F5F5F5",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "119",
                color: "#FFF5EE",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "120",
                color: "#F5F5DC",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "121",
                color: "#FDF5E6",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "122",
                color: "#FFFAF0",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "123",
                color: "#FFFFF0",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "124",
                color: "#FAEBD7",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "125",
                color: "#FAF0E6",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "126",
                color: "#FFF0F5",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "127",
                color: "#FFE4E1",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "128",
                color: "#DCDCDC",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "129",
                color: "#D3D3D3",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "130",
                color: "#C0C0C0",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "131",
                color: "#f7f7f7",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "132",
                color: "#b2b2b2",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "133",
                color: "#6f6c6c",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "134",
                color: "#4d4646",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "135",
                color: "#4c4c4c",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "136",
                color: "#2F4F4F",
                permissions: []
            }
        })
        message.guild.roles.create({
            data: {
                name: "137",
                color: "#040000",
                permissions: []
            }
        })
        const embed1 = new MessageEmbed()
            .setTitle("🕑 **Preparing your server color rules ...**")
            .setFooter(`Request By ${message.author.username}`)
            .setTimestamp()
        const embed2 = new MessageEmbed()
            .setTitle("✅ **Your colors is ready**")
            .setFooter(`Request By ${message.author.username}`)
            .setTimestamp()
        message.channel.send(embed1).then(m => {
            setTimeout(() => {
                m.delete()
                m.channel.send(embed2)
            }, 30000)
        })
    }
};