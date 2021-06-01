require('./src/24/7/server')
require("dotenv").config();
const Discord = require('discord.js');
const moment = require("moment")
const { MessageAttachment } = require('discord.js');
const serverInvites = new Map();
const ms = require('ms');
const auto = require("./src/cmd/admin/auto.json");
const Canvas = require('canvas');
const client = new Discord.Client();
const fs = require('fs');
const Enmap = require('enmap')
let cooldown = new Set()
client.profile = new Enmap({ name: "profile", fetchAll: true })
client.settings = new Enmap({ name: "settings", fetchAll: true })
client.ticket = ticket = new Enmap({ name: "ticket", autoFetch: true, cloneLevel: "deep", fetchAll: true });
const fetch = require("node-fetch");
const db = require('quick.db');

client.config = require("./config/bot.json")
client.build = require("./config/build.json")

fs.readdir('./src/events/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./src/events/${file}`);
        let eventName = file.split('.')[0];
        console.log(`Loading ${eventName}.js!`);
        client.on(eventName, event.bind(null, client));
    });
});
fs.readdir(`./src/cmd/admin/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/admin/${file}`);
        console.log("Loading Admin Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/music/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        console.log("Loading Musci Command \"" + commandName + "\"")
    })
});
fs.readdir(`./src/cmd/general/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/general/${file}`);
        console.log("Loading General Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/author/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/author/${file}`);
        console.log("Loading Author Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/games/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/games/${file}`);
        console.log("Loading Games Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/level/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/level/${file}`);
        console.log("Loading Level Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/economy/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/economy/${file}`);
        console.log("Loading Economy Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
fs.readdir(`./src/cmd/ticket/`, (error, files) => {
    if (error) { return console.log("error i can not find commands"); };
    files.forEach(file => {
        let commandName = file.split('.')[0];
        if (!file.endsWith(".js")) return console.log('Can\'t Load "' + commandName + '"')
        const command = require(`./src/cmd/ticket/${file}`);
        console.log("Loading Ticket Command \"" + commandName + "\"")
        client.commands.set(command.name, command);
    })
});
client.on('message', async(msg) => {
    if (msg.channel.type == "dm") return;
    client.settings.ensure(msg.guild.id, {
        roles: [],
        messageroles: [],
        levelsystem: true,
        message: 'Not set',
        channel: 0,
        xpgain: [{ first: 0, second: 30 }],
        noxproles: [],
        noxpchannels: [],
        userchannels: [],
        userchannelcreate: { category: 'none', channel: 'none' },
        antiinvite: false,
        roleschannel: "none",
        imagechannel: [],
        doublexproles: [],
        welcomeroles: [],
        welcomechannel: "none",
        welcomemessage: [{ message: "none" }, { title: "none", description: "none", image: "none", footer: "none", color: "none", embed: false }],
    })
    let regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/
    if (regex.test(msg.content) && client.settings.get(msg.guild.id, "antiinvite")) {
        if (msg.member.permissions.has("ADMINISTRATOR")) return;
        msg.channel.send(`***${msg.author.tag}***, invite links are not allowed!`).then(m => m.delete({ timeout: 10000 }))
        msg.delete()
    }
    if (msg.author.bot) return;
    client.profile.ensure(`${msg.guild.id}-${msg.author.id}`, {
        id: msg.author.id,
        guild: msg.guild.id,
        level: 0,
        levelpoints: 0,
        lastMessage: "none",
    })
    if (!client.profile.has(`${msg.guild.id}-${msg.author.id}`, "lastMessage")) {
        client.profile.set(`${msg.guild.id}-${msg.author.id}`, "none", "lastMessage")
    } else if (!client.settings.has(msg.guild.id, "userchannels")) {
        client.settings.set(msg.guild.id, [], "userchannels")
    } else if (!client.settings.has(msg.guild.id, "userchannelcreate")) {
        client.settings.set(msg.guild.id, { category: 'none', channel: 'none' }, "userchannelcreate")
    }
    if (client.settings.get(msg.guild.id, "roleschannel") !== "none") {
        if (msg.channel.id === client.settings.get(msg.guild.id, "roleschannel")) {
            msg.delete()
        }
    }
    if (client.settings.get(msg.guild.id, "imagechannel").length) {
        for (let i = 0; i < client.settings.get(msg.guild.id, "imagechannel").length; i++) {
            if (client.settings.get(msg.guild.id, "imagechannel")[i] === msg.channel.id && msg.attachments.size < 1) {
                msg.delete()
                msg.author.send('You said something that was not an image in an `image only` channel!')
            }
        }
    }
    let points = Math.floor(Math.random(client.settings.get(msg.guild.id, "xpgain")[0].first) * client.settings.get(msg.guild.id, "xpgain")[0].second)
    let randomcooldown = Math.floor(Math.random() * 8000) + 5000;
    if (cooldown.has(`${msg.author.id}-${msg.guild.id}`)) {
        points = 0;
    } else if (client.profile.get(`${msg.guild.id}-${msg.author.id}`, "lastMessage") === msg.content) {
        points = 0;
    }
    client.profile.set(`${msg.guild.id}-${msg.author.id}`, msg.content, "lastMessage")
    client.settings.get(msg.guild.id, "doublexproles").forEach(r => {
        if (msg.guild.member(msg.author).roles.has(r)) {
            points = points * 2
        }
    })
    let array3 = client.settings.get(msg.guild.id, "noxpchannels")
    if (array3.length) {
        array3.forEach(c => {

            if (c == msg.channel.id) {
                points = 0;
            }
        })
    }
    let array2 = client.settings.get(msg.guild.id, "noxproles")
    if (array2.length) {
        array2.forEach(r => {
            let member = msg.guild.member(msg.author)
            let roletofind = msg.guild.roles.find(n => n.name === r)
            if (member.roles.has(r)) {
                points = 0;
            }

        })
    }
    if (client.settings.get(msg.guild.id, "levelsystem") === false) {
        points = 0;
    }
    client.profile.math(`${msg.guild.id}-${msg.author.id}`, '+', points, "levelpoints")
    cooldown.add(`${msg.author.id}-${msg.guild.id}`);
    setTimeout(() => {
        cooldown.delete(`${msg.author.id}-${msg.guild.id}`)
    }, randomcooldown);
    const curLevel = Math.floor(0.1 * Math.sqrt(client.profile.get(`${msg.guild.id}-${msg.author.id}`, "levelpoints")) + 1);
    const { MessageEmbed } = require('discord.js')
    if (client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") < curLevel) {
        let message = client.settings.get(msg.guild.id, "message")
        let channel = client.settings.get(msg.guild.id, "channel")
        if (!channel) channel = msg.channel.id
        if (message == "Not set") message = `{user} has leveled up to level **{level}**! `
        if (client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") === 0) {
            client.profile.set(`${msg.guild.id}-${msg.author.id}`, 1, "level");
        } else if (client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") > 0) {
            client.channels.cache.get(channel).send(message.replace('{user}', msg.author).replace('{level}', curLevel))
        }
        client.profile.set(`${msg.guild.id}-${msg.author.id}`, curLevel, "level");
        let array = client.settings.get(msg.guild.id, "roles")
        let data = array.findIndex(obj => obj.level === curLevel)
        if (data < 0) return;
        msg.guild.member(msg.author).roles.add(array[data].role)
        msg.channel.send('You leveled up to level **' + curLevel + '** and was rewarded with the role ' + msg.guild.roles.cache.get(array[data].role).toString() + ' 👍').then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000);
        })
    }
    if (msg.content.indexOf(client.settings.get(msg.guild.id, "prefix")) !== 0) return;

    const args = msg.content.slice(client.settings.get(msg.guild.id, "prefix").length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if (!cmd) return;
    cmd.run(client, msg, args);
})
client.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    let roleArray = client.settings.get(member.guild.id, "welcomeroles")
    if (roleArray.length > 0) {
        for (let d = 0; d < roleArray.length; d++) {
            member.roles.add(roleArray[d])
        }
    }
    let { MessageEmbed } = require('discord.js')
    let array = client.settings.get(member.guild.id, "welcomemessage")
    let channel = client.settings.get(member.guild.id, "welcomechannel")
    let embed = new MessageEmbed();
    if (array[1].title !== "none") embed.setTitle(array[1].title.replaceAll("{usertag}", member.user.tag).replaceAll("{members}", member.guild.memberCount).replaceAll("{userid}", member.user.id).replaceAll("{servername}", member.guild.name))
    if (array[1].description !== "none") embed.setDescription(array[1].description.replaceAll("{user}", member.user).replaceAll("{usertag}", member.user.tag).replaceAll("{members}", member.guild.memberCount).replaceAll("{userid}", member.user.id).replaceAll("{servername}", member.guild.name))
    if (array[1].image !== "none") embed.setImage(array[1].image)
    if (array[1].footer !== "none") embed.setFooter(array[1].footer.replaceAll("{usertag}", member.user.tag).replaceAll("{members}", member.guild.memberCount).replaceAll("{userid}", member.user.id).replaceAll("{servername}", member.guild.name))
    embed.setColor(array[1].color)
    if (channel === "dm") {
        if (array[1].embed === true) {
            member.send(embed)
            return;
        } else if (array[1].embed === false) {
            member.send(array[0].message)
            return;
        }
    }
    if (!member.guild.channels.cache.get(channel)) return;

    if (array[1].embed === true) {
        client.channels.cache.get(channel).send(embed)
        return;
    } else if (array[1].embed === false) {
        client.channels.cache.get(channel).send(array[0].message.replaceAll("{user}", member.user).replaceAll("{usertag}", member.user.tag).replaceAll("{members}", member.guild.memberCount).replaceAll("{userid}", member.user.id).replaceAll("{servername}", member.guild.name))
        return;
    }
})
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
process.env.MONGOOSES = client.config.bot.connections.mongoose
const WOKCommands = require('wokcommands')
client.on('ready', () => {
    new WOKCommands(client, {
            commandsDir: 'src/cmd/reactions_role',
            featureDir: 'src/cmd/',
            showWarns: false,
        })
        .setMongoPath(process.env.MONGOOSES)
        .setDefaultPrefix(client.config.bot.setting.main_prefix)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (!client.channels.cache.get(client.settings.get(oldMember.guild.id, "userchannelcreate").channel) || !client.channels.cache.get(client.settings.get(oldMember.guild.id, "userchannelcreate").category)) return;
    if (oldMember.channel) {
        if (client.settings.get(oldMember.guild.id, "userchannels").findIndex(obj => obj.channel === oldMember.channelID) < 0) return;
        if (oldMember.channel.members.size <= 0) oldMember.member.user.send("You have left a personal voice channel, it will be removed in 30 seconds unless you join back. (because it is empty)")
        setTimeout(() => {
            if (oldMember.channel.members.size <= 0) {
                if (!client.channels.cache.get(oldMember.channelID)) return;
                client.settings.delete(oldMember.guild.id, `userchannels.${client.settings.get(oldMember.guild.id, "userchannels").findIndex(obj => obj.channel === oldMember.channelID)}`)
                client.channels.cache.get(oldMember.channelID).delete()

            }
        }, 30000);
        return;
    }
    if (client.settings.get(oldMember.guild.id, "userchannelcreate").channel === newMember.channelID) {
        oldMember.guild.channels.create(oldMember.member.user.username + `'s Channel`, { type: "voice" }).then(c => {
            c.setParent(client.settings.get(oldMember.guild.id, "userchannelcreate").category)
            client.settings.push(newMember.guild.id, { channel: c.id, author: newMember.id }, "userchannels")
            newMember.member.voice.setChannel(c)
            c.overwritePermissions({
                permissionOverwrites: [{
                        id: newMember.member.user.id,
                        allow: ['CONNECT'],
                    },
                    {
                        id: newMember.guild.id,
                        deny: ["CONNECT"],
                    }
                ],
                reason: 'Updated user channel!'
            });
        })
        return;
    }
    if (!client.settings.get(oldMember.guild.id, "userchannels").includes(oldMember.channelID)) return;


    if (oldMember.channel) {
        if (oldMember.channel.members.size <= 0) oldMember.member.user.send("You have left a personal voice channel, it will be removed in 30 seconds unless you join back. (because it is empty)")
        setTimeout(() => {
            if (oldMember.channel.members.size <= 0) {
                if (!client.channels.cache.get(oldMember.channelID)) return;
                client.channels.cache.get(oldMember.channelID).delete()
            }
        }, 30000);
        return;
    }
})
client.on('messageReactionAdd', async(reaction, user) => {
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    if (user.bot) return;

    let ticketid = await client.ticket.get(`${reaction.message.guild.id}-ticket`);

    if (!ticketid) return;

    if (reaction.message.id == ticketid && reaction.emoji.name == '📩') {
        reaction.users.remove(user);
        var x = user.username;
        reaction.message.guild.channels.create(`ticket-${x}`, {
            permissionOverwrites: [{
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            type: 'text'
        }).then(async channel => {
            channel.send(`<@${user.id}> Welcome`, new Discord.MessageEmbed().setDescription("**White For Admin Response!**").setColor(client.build.colors.warn))
        })
    }
});

client.on("inviteCreate", async invite => serverInvites.set(invite.guild.id, await invite.guild.fetchInvites())).on("ready", () => {
        client.guilds.cache.forEach(guild => {
            guild.fetchInvites().then(invites => serverInvites.set(guild.id, invites)).catch(err => console.log(err));
        });
    }).on('guildMemberAdd', async(member) => {
            const checkedInvites = serverInvites.get(member.guild.id);
            const checkInvites = await member.guild.fetchInvites();
            serverInvites.set(member.guild.id, checkInvites);
            const welcome_channel = db.get(`${member.guild.id}.channel`).id;
            const welcome_Message = db.get(`${member.guild.id}.message`);
            const channel = member.guild.channels.cache.get(welcome_channel)
            const canvas = Canvas.createCanvas(519, 292);
            const ctx = canvas.getContext('2d');

            const img = await Canvas.loadImage('./data/img.png');
            let x = 0
            let y = 0
            ctx.drawImage(img, x, y)

            Canvas.registerFont('./data/CairoBold.ttf', { family: 'cairo-bold' });

            var name = member.user.tag;
            ctx.strokeStyle = '#ed9209';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = '20px Cairo';
            ctx.fillStyle = '#ed9209';

            ctx.fillText(name, canvas.width / 2.4, canvas.height / 2.7);

            var join = `Welcome To ${member.guild.name}. !`;
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = '20px Cairo';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(join, canvas.width / 2.4, canvas.height / 2.0);



            x = 40
            y = 80

            ctx.beginPath();
            ctx.arc(105, 145, 65, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "png" }))
            ctx.lineTo(avatar, 250, 150)
            ctx.drawImage(avatar, x, y);

            const attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png")
            channel.send('', attachment).then(m => {
                        setTimeout(() => {
                                    const usedInvite = checkInvites.find(inv => checkedInvites.get(inv.code).uses < inv.uses);
                                    channel.send(`${welcome_Message.replace('[NAME]', `<@!${member.user.id}>`).replace('[COUNT]', member.guild.memberCount).replace('[AGE]', member.user.createdAt.toLocaleString()).replace('[GNAME]', member.guild.name).replace('[INVITER]', usedInvite.inviter.username).replace('[NAME]', `<@!${member.user.id}>`).replace('[DEFALT]', `> \`-\` **<@!${member.user.id}> Was Joined To ${member.guild.name} Server! 💫**\n> \`-\` **<@!${member.user.id}> Account Created At ${member.user.createdAt.toLocaleString()} 🕓**\n> \`-\` **${member.guild.name} Now Has ${member.guild.memberCount} Member! 👥**\n> \`-\` **<@!${member.user.id}> Was Invited By ${usedInvite.inviter.username}! 🧲**`) || `> \`-\` **<@!${member.user.id}> Was Joined To ${member.guild.name} Server! 💫**\n> \`-\` **<@!${member.user.id}> Account Created At ${member.user.createdAt.toLocaleString()} 🕓**\n> \`-\` **__${member.guild.name} Server__ Now Has ${member.guild.memberCount} Member! 👥**\n> \`-\` **<@!${member.user.id}> Was Invited By ${usedInvite.inviter.username}! 🧲**`}`)
                                    client.invites = usedInvite.uses
      }, 1500)
    })
  })
client.on('message', async(message) => {
    let ncr = message.content;
    if (!auto[ncr + message.guild.id]) return;
    if (ncr == auto[ncr + message.guild.id].msg)
        return message.channel.send(auto[ncr + message.guild.id].reply);
})
client.on('guildMemberAdd', async(member) => {
    var Content = await db.fetch(`Auto_Role_${member.guild.id}`);
    if (Content == null) return;
    if (Content == undefined) return;
    var roleContent = db.get(`Auto_Role_${member.guild.id}.arole`).id
    member.roles.add(roleContent)
})
client.commands = new Discord.Collection();

client.login(process.env.TOKEN).catch(err => {
    console.table({
        Error: "THE TOKEN IS INVIELD"
    })
})

const cd = require("countdown");
const totime = require("to-time");
const dbg = new Enmap({ name: "Giveaway" });
client.on("ready", async message => {
  await dbg.defer;
  await console.log(`Logged in as [ ${client.user.username} ]!`);
  client.guilds.cache.forEach(async g => {
    g.channels.cache.filter(
        c =>
          c.type == "text" &&
          c.permissionsFor(client.user.id).has("VIEW_CHANNEL")
      )
      .forEach(async c => {
        let fetched = await c.messages.fetch();
        if (fetched.size == 0) return;
        let mess = await fetched.filter(
          r =>
            r.author.id === client.user.id && r.content == `**🎉 GIVEAWAY 🎉**`
        );
        if (mess.size == 0) return;
        
        mess.forEach(m => {
          if (!m) return;
          if (!dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`)) return;
          let time2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtime;
          let text2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtext;
          let win2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gwin;
          if (time2 === null || time2 === undefined) return;
          let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor(`${text2}`, g.iconURL)
            .setDescription(
              `React with 🎉 to enter!\nTime remaining: ${cd(
                new Date().getTime(),
                time2
              )}`
            )
            .setFooter(`Ends at`, client.user.avatarURL)
            .setTimestamp(time2);
          let embed2 = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(text2, g.iconURL)
            .setFooter(`Ended at`);
          let ttimer = setInterval(async () => {
            if (!m || m.content == `🎉 **GIVEAWAY ENDED** 🎉`) return;
            let ttt = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
            if (ttt.includes(moment().diff(time2, "seconds")))
              return m.edit(
                `🎉 **GIVEAWAY** 🎉`,
                embed
                  .setColor("#ffb800")
                  .setDescription(
                    `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                      new Date().getTime(),
                      time2
                    )}`
                  )
              );
            m.edit(
              `🎉 **GIVEAWAY** 🎉`,
              embed.setDescription(
                `React with 🎉 to enter!\nTime remaining: ${cd(
                  new Date().getTime(),
                  time2
                )}`
              )
            );
            if (moment().isAfter(time2)) {
              m.reactions
                .filter(a => a.emoji.name == "🎉")
                .map(r =>
                  r.fetchUsers().then(u => {
                    let rusers = u
                      .filter(user => !user.bot)
                      .random(parseInt(win2));
                    m.edit(
                      `${g} GIVEAWAY ENDED ${g}`,
                      embed2
                        .setTimestamp()
                        .setDescription(`Winners:\n${rusers || "No winners"}`)
                    );
                    if (
                      m.reactions
                        .filter(a => a.emoji.name == "🎉")
                        .map(reaction => reaction.count)[0] <= 1
                    ) {
                      return m.channel.send(`No winners :rolling_eyes:`);
                    } else {
                      m.channel.send(
                          new Discord.MessageEmbed()
                          .setColor(client.build.colors.done)
                          .setDescription(`🎊 Congratulations 🎊 ${rusers}! You won the **${text2}** 🎉`)
                      );
                    }
                    dbg.delete(`giveaway.${g.id}.${c.id}.${m.id}.time`);
                    clearInterval(ttimer);
                    return;
                  })
                );
            }
          }, 5000);
        });
      });
  });
});
client.on('error', console.error);
client.on('warn', warn => console.warn(`[WARN] - ${warn}`));
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
});

client.on("message", async message => {
    let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
    if (Blacklist === "on") {
        message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
        return;
    }
    var prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) prefix = client.config.bot.setting.main_prefix;
  if (message.author.bot || message.channel.type == "dm") return undefined;
  let args = message.content.split(" ");
  let timer;
  if (args[0] == `${prefix}gstart`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.cache.find(r => r.name == "بتبص على ايه ؟")
    ) {
      if (!args[1] || !args[2] || !args[3])
        return message.channel.send(
            new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} Usage: \`${prefix}gstart [Time] [Winners] [Giveaway Prize]\n\`Example: \`${prefix}gstart 4h 1 Nitro\`**`
               )       );
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS"))
        return message.channel.send(
            new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} I don't have **Embed Links** permission.`));
      if (ms(args[1]) === undefined)
        return message.channel.send(
            new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} Please use a proper time format.`));
      if (isNaN(args[2]))
        return message.channel.send(
            new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} Winners must be number!`));
      if (args[2] < 1 || args[2] > 10)
        return message.channel.send(
            new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} Winners must be bettwen 1 and 10.**`));
      let timega = ms(args[1]) / 1000;
      let time = Date.now() + totime.fromSeconds(timega).ms();
      if (timega < 5)
        return message.channel.send(
          `Giveaway time can't be less than 5 seconds.`
        );
      let timespan = cd(new Date().getTime(), time);
      let rusers;
      let embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`${args.slice(3).join(" ")}`)
        .setDescription(`React with 🎉 to enter!\nTime remaining: ${timespan}`)
        .setFooter(`Ends at`, client.user.avatarURL)
        .setTimestamp(time);
      let embed2 = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(args.slice(3).join(" "))
        .setFooter(`Ended at`);
      let msg = await message.channel
        .send(`**🎉 GIVEAWAY 🎉**`, embed)
        .catch(err => message.channel.send(`Error: \`${err}\``));
      dbg.set(
        `giveaway.${message.guild.id}.${message.channel.id}.${msg.id}.time`,
        {
          gtime: time,
          gid: msg.id,
          gtext: args.slice(3).join(" "),
          gwin: args[2]
        }
      );
      await msg.react("🎉");
      timer = setInterval(() => {
        if (!msg || msg.content == `**🎉 GIVEAWAY ENDED 🎉**`) return;
        let ttt = [-2, -3, -4, -5, -6, -7, -8, -9, -10];
        if (ttt.includes(moment().diff(time, "seconds")))
          return msg.edit(
            `**🎉 GIVEAWAY 🎉**`,
            embed
              .setColor("#ffb800")
              .setDescription(
                `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                  new Date().getTime(),
                  time
                )}`
              )
          );
        msg.edit(
          `**🎉 GIVEAWAY 🎉**`,
          embed.setDescription(
            `React with 🎉 to enter!\nTime remaining: ${cd(
              new Date().getTime(),
              time
            )}`
          )
        );
        rusers = msg.reactions.cache.filter(a => a.emoji.name == "🎉")
          .map(reaction =>
            reaction.users.cache.filter(u => !u.bot).random(parseInt(args[2]))
          )[0];
        if (moment().isAfter(time)) {
          msg.edit(
            `**🎉 GIVEAWAY ENDED 🎉**`,
            embed2
              .setTimestamp()
              .setDescription(`Winners:\n${rusers || "No winners"}`)
          );
          if (
            msg.reactions.cache.filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          ) {
            return message.channel.send(``);
          } else {
            msg.channel.send(
                new Discord.MessageEmbed()
                .setColor(client.build.colors.done)
                .setDescription(`🎊 Congratulations 🎊 ${rusers}! You won the **${args.slice(3).join(" ")}** 🎉`)
            )
          }
          clearInterval(timer);
          return;
        }
      }, 5000);
    } else return undefined;
  } else if (args[0] == `${prefix}groll`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.find(r => r.name == "")
    ) {
      if (!args[1])
        return message.channel.send(
          `**Usage:** **\`${prefix}groll [giveaway message id]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`Thats not a message ID`);
      message.channel
        .messages.fetch(args[1])
        .then(async m => {
          if (m.author.id != client.user.id)
            return message.channel.send(
                new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} This is not a giveaway message.`));
          if (!m.content.includes(`**🎉 GIVEAWAY 🎉**`))
            return message.channel.send(
                new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} This is not a giveaway message.`));
          if (m.content != `**🎉 GIVEAWAY ENDED 🎉**`)
            return message.channel.send(
                new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} The giveaway is not ended.`));
          if (m.reactions.size < 1)
            return message.channel.send(
                new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} I can't find reactions in this message.`
            ));
          if (
            m.reactions.cache.filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          )
            return message.channel.send("_ _");
          m.reactions.cache.filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.fetchUsers().then(async u => {
                let rusers = u.filter(user => !user.bot).random();
                await message.channel.send(
                    new Discord.MessageEmbed().setColor(client.build.colors.done).setDescription(`**${client.build.emojis.done} The new winner is: ${rusers}`));
              })
            );
        })
        .catch(err =>
          message.channel.send(
            new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} I can't find this message in the channel.`))
        );
    } else return undefined;
  } else if (args[0] == `${prefix}gend`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.find(r => r.name == "بتبص على ايه ؟")
    ) {
      if (!args[1])
        return message.channel.send(
            new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} Usage: \`${prefix}gend [giveaway message id]\``
        ));
      if (isNaN(args[1])) return message.channel.send(
        new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} Thats not a message ID`));
      message.channel.messages.fetch(args[1])
        .then(async m => {
          if (m.author.id != client.user.id)
            return message.channel.send(
                new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} This is not a giveaway message.`));
          if (!m.content.includes(`**🎉 GIVEAWAY 🎉**`))
            return message.channel.send(
                new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} This is not a giveaway message.`));
          if (m.content == `**🎉 GIVEAWAY ENDED 🎉**`)
            return message.channel.send(new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} The giveaway is ended.`));
          if (m.reactions.size < 1)
            return message.channel.send(
                new Discord.MessageEmbed().setColor(client.build.colors.err).setDescription(`**${client.build.emojis.err} I can't find reactions in this message.`)
            );
          let gv = dbg.get(
            `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
          );
          let rusers = m.reactions.map(r =>
            r.users.filter(u => !u.bot).random(parseInt(gv.gwin))
          );
          let embed2 = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(gv.gtext)
            .setFooter(`Ended at`);
          m.reactions.cache.filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.fetchUsers().then(async u => {
                let rusers = u
                  .filter(user => !user.bot)
                  .random(parseInt(gv.gwin));
                m.edit(
                  `**🎉 GIVEAWAY ENDED 🎉**`,
                  embed2
                    .setTimestamp()
                    .setDescription(`Winners:\n${rusers || "No winners"}`)
                );
                if (
                  m.reactions.cache.filter(a => a.emoji.name == "🎉")
                    .map(reaction => reaction.count)[0] <= 1
                ) {
                  return message.channel.send(`ERROR: 404`);
                } else {
                  message.channel.send(
                    new Discord.MessageEmbed()
                    .setColor(client.build.colors.done)
                    .setDescription(`🎊 Congratulations 🎊 ${rusers}! You won the **${gv.gtext}** 🎉`)
                );
                  }
                await dbg.delete(
                  `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
                );
                return;
              })
            );
        })
        .catch(err =>
          message.channel.send(`I can't find this message in the channel.`)
        );
    } else return undefined;
  }
});

const { Client, Util, MessageEmbed } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
require("dotenv").config();
const youtube = new YouTube(client.config.bot.connections.yt_api);
const error = client.build.emojis.err;
const timeing = client.build.emojis.warn;
const success = client.build.emojis.done;
const lodeing = client.build.emojis.done;
const notes = "🎶";
const stop = "⏹";
const sos = "🆘";
const skippeded = "⏭️";
const repeating = "🔁";
const resumed = "▶";
const pauseeded = "⏸";
const queue = new Map();
client.on("warn", console.warn);
client.on("error", console.error);
client.on("message", async message => {
  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        var PREFIX = await db.fetch(`prefix_${message.guild.id}`);
        if (PREFIX == null) PREFIX = client.config.bot.setting.main_prefix;
            // eslint-disable-line
            if (message.author.bot) return;
            if (!message.content.startsWith(PREFIX)) return;

            const args = message.content.split(" ");
            const searchString = args.slice(1).join(" ");
            const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
            const serverQueue = queue.get(message.guild.id);

            let command = message.content.toLowerCase().split(" ")[0];
            command = command.slice(PREFIX.length);

            if (command === "play" || command === "p" || command === "شغل") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel)
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Be in a Voice Channel First!"
                        }
                    });
                const permissions = voiceChannel.permissionsFor(message.client.user);
                if (!permissions.has("CONNECT")) {
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Sorry, but I need a **`CONNECT`** permission to proceed!"
                        }
                    });
                }
                if (!permissions.has("SPEAK")) {
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Sorry, but I need a **`SPEAK`** permission to proceed!"
                        }
                    });
                }
                if (!url || !searchString)
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Please input link/title to play music"
                        }
                    });
                if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                    const playlist = await youtube.getPlaylist(url);
                    const videos = await playlist.getVideos();
                    for (const video of Object.values(videos)) {
                        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                    }
                    return message.channel.send({
                        embed: {
                            color: "GREEN",
                            description: `${success}  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue`
                        }
                    });
                } else {
                    try {
                        var video = await youtube.getVideo(url);
                    } catch (error) {
                        try {
                            var videos = await youtube.searchVideos(searchString, 10);
                            var video = await youtube.getVideoByID(videos[0].id);
                            if (!video)
                                return message.channel.send({
                                    embed: {
                                        color: "RED",
                                        description: `${sos}  **|**  I could not obtain any search results`
                                    }
                                });
                        } catch (err) {
                            console.error(err);
                            return message.channel.send({
                                embed: {
                                    color: "RED",
                                    description: `${sos}  **|**  I could not obtain any search results`
                                }
                            });
                        }
                    }
                    return handleVideo(video, message, voiceChannel);
                }
            }
            if (command === "search" || command === "sc") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel)
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "I'm sorry, but you need to be in a voice channel to play a music!"
                        }
                    });
                const permissions = voiceChannel.permissionsFor(message.client.user);
                if (!permissions.has("CONNECT")) {
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Sorry, but I need a **`CONNECT`** permission to proceed!"
                        }
                    });
                }
                if (!permissions.has("SPEAK")) {
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Sorry, but I need a **`SPEAK`** permission to proceed!"
                        }
                    });
                }
                if (!url || !searchString)
                    return message.channel.send({
                        embed: {
                            color: "RED",
                            description: "Please input link/title to search music"
                        }
                    });
                if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                    const playlist = await youtube.getPlaylist(url);
                    const videos = await playlist.getVideos();
                    for (const video of Object.values(videos)) {
                        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                    }
                    return message.channel.send({
                        embed: {
                            color: "GREEN",
                            description: `${success}  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue`
                        }
                    });
                } else {
                    try {
                        var video = await youtube.getVideo(url);
                    } catch (error) {
                        try {
                            var videos = await youtube.searchVideos(searchString, 10);
                            let index = 0;
                            let embedPlay = new MessageEmbed()
                                .setColor("BLUE")
                                .setAuthor("Search results", message.author.displayAvatarURL())
                                .setDescription(
                                    `${videos
                .map(video2 => `**\`${++index}\`  |**  ${video2.title}`)
                .join("\n")}`
            )
            .setFooter(
              "Please choose one of the following 10 results, this embed will auto-deleted in 15 seconds"
            );
          // eslint-disable-next-line max-depth
          message.channel.send(embedPlay).then(m =>
            m.delete({
              timeout: 15000
            })
          );
          try {
            var response = await message.channel.awaitMessages(
              message2 => message2.content > 0 && message2.content < 11,
              {
                max: 1,
                time: 15000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return message.channel.send({
              embed: {
                color: "RED",
                description:
                  "The song selection time has expired in 15 seconds, the request has been canceled."
              }
            });
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return message.channel.send({
            embed: {
              color: "RED",
              description: `${sos}  **|**  I could not obtain any search results`
            }
          });
        }
      }
      response.delete();
      return handleVideo(video, message, voiceChannel);
    }
  } else if (command === "skip") {
    if (!message.member.voice.channel)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "I'm sorry, but you need to be in a voice channel to skip a music!"
        }
      });
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing that I could skip for you"
        }
      });
    serverQueue.connection.dispatcher.end(
      "[runCmd] Skip command has been used"
    );
    return message.channel.send({
      embed: {
        color: "GREEN",
        description: `${skippeded}  **|**  I skipped the song for you`
      }
    });
  } else if (command === "stop") {
    if (!message.member.voice.channel)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "I'm sorry but you need to be in a voice channel to play music!"
        }
      });
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing that I could stop for you"
        }
      });
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(
      "[runCmd] Stop command has been used"
    );
    return message.channel.send({
      embed: {
        color: "GREEN",
        description: `${stop}  **|**  Deleting queues and leaving voice channel...`
      }
    });
  } else if (command === "volume" || command === "vol") {
    if (!message.member.voice.channel)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "I'm sorry, but you need to be in a voice channel to set a volume!"
        }
      });
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing"
        }
      });
    if (!args[1])
      return message.channel.send({
        embed: {
          color: "BLUE",
          description: `The current volume is: **\`${serverQueue.volume}%\`**`
        }
      });
    if (isNaN(args[1]) || args[1] > 100)
      return message.channel.send({
        embed: {
          color: "RED",
          description:
            "Volume only can be set in a range of **`1`** - **`100`**"
        }
      });
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolume(args[1] / 100);
    return message.channel.send({
      embed: {
        color: "GREEN",
        description: `I set the volume to: **\`${args[1]}%\`**`
      }
    });
  } else if (command === "nowplaying" || command === "np") {
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing"
        }
      });
    return message.channel.send({
      embed: {
        color: "BLUE",
        description: `${notes}  **|**  Now Playing: **\`${serverQueue.songs[0].title}\`**`
      }
    });
  } else if (command === "queue" || command === "q") {
    let songsss = serverQueue.songs.slice(1);

    let number = songsss.map((x, i) => `${i + 1} - ${x.title}`);
    number = chunk(number, 5);

    let index = 0;
    if (!serverQueue)
      return message.channel.send({
        embed: {
          color: "RED",
          description: "There is nothing playing"
        }
      });
    let embedQueue = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor("Song queue", message.author.displayAvatarURL())
      .setDescription(number[index].join("\n"))
      .setFooter(
        `• Now Playing: ${serverQueue.songs[0].title} | Page ${index + 1} of ${
        number.length
        }`
      );
    const m = await message.channel.send(embedQueue);

    if (number.length !== 1) {
      await m.react("⬅");
      await m.react("🛑");
      await m.react("➡");
      async function awaitReaction() {
        const filter = (rect, usr) =>
          ["⬅", "🛑", "➡"].includes(rect.emoji.name) &&
          usr.id === message.author.id;
        const response = await m.awaitReactions(filter, {
          max: 1,
          time: 30000
        });
        if (!response.size) {
          return undefined;
        }
        const emoji = response.first().emoji.name;
        if (emoji === "⬅") index--;
        if (emoji === "🛑") m.delete();
        if (emoji === "➡") index++;

        if (emoji !== "🛑") {
          index = ((index % number.length) + number.length) % number.length;
          embedQueue.setDescription(number[index].join("\n"));
          embedQueue.setFooter(`Page ${index + 1} of ${number.length}`);
          await m.edit(embedQueue);
          return awaitReaction();
        }
      }
      return awaitReaction();
    }
  } else if (command === "pause") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `${pauseeded}  **|**  Paused the music for you`
        }
      });
    }
    return message.channel.send({
      embed: {
        color: "RED",
        description: "There is nothing playing"
      }
    });
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `${resumed}  **|**  Resumed the music for you`
        }
      });
    }
    return message.channel.send({
      embed: {
        color: "RED",
        description: "There is nothing playing"
      }
    });
  } else if (command === "loop") {
    if (serverQueue) {
      serverQueue.loop = !serverQueue.loop;
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `${repeating}  **|**  Loop is **\`${
            serverQueue.loop === true ? "enabled" : "disabled"
            }\`**`
        }
      });
    }
    return message.channel.send({
      embed: {
        color: "RED",
        description: "There is nothing playing"
      }
    });
  }
});

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
      loop: false
    };
    queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `[ERROR] I could not join the voice channel, because: ${error}`
      );
      queue.delete(message.guild.id);
      return message.channel.send({
        embed: {
          color: "RED",
          description: `I could not join the voice channel, because: **\`${error}\`**`
        }
      });
    }
  } else {
    serverQueue.songs.push(song);
    if (playlist) return;
    else
      return message.channel.send({
        embed: {
          color: "GREEN",
          description: `${success}  **|**  **\`${song.title}\`** has been added to the queue`
        }
      });
  }
  return;
}

function chunk(array, chunkSize) {
  const temp = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    temp.push(array.slice(i, i + chunkSize));
  }
  return temp;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    return queue.delete(guild.id);
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      const shiffed = serverQueue.songs.shift();
      if (serverQueue.loop === true) {
        serverQueue.songs.push(shiffed);
      }
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolume(serverQueue.volume / 100);

  serverQueue.textChannel.send({
    embed: {
      color: "BLUE",
      description: `${notes}  **|**  Start Playing: **\`${song.title}\`**`
    }
  });
}

process.on("unhandledRejection", (reason, promise) => {
  try {
    console.error(
      "Unhandled Rejection at: ",
      promise,
      "reason: ",
      reason.stack || reason
    );
  } catch {
    console.error(reason);
  }
});

process.on("uncaughtException", err => {
  console.error(`Caught exception: ${err}`);
  process.exit(1);
});

const ACTIVITIES = {
  "youtube": {
    id: "755600276941176913", // don't touch this
    name: "YouTube Together"
  },

};

client.on("ready", () => console.log("Bot is online!"));
client.on("warn", console.warn);
client.on("error", console.error);

client.on("message", async message => {
  if (message.author.bot || !message.guild) return;
  if (message.content.indexOf(client.config.bot.setting.main_prefix) !== 0) return;
  const args = message.content.slice(client.config.bot.setting.main_prefix.length).trim().split(" ");
  const cmd = args.shift().toLowerCase();
  if (cmd === "youtube") {
    const channel = message.member.voice.channel;
    if (!channel || channel.type !== "voice") {
      message.channel.send(
        new MessageEmbed()
          .setDescription('❌ | Please Join A Voice Channel First')
          .setColor('RED'));
      return;
    }
    if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) {
      message.channel.send(new MessageEmbed()
        .setDescription('❌ | I Can\' Make Invites Please Give Me "CREATE_INSTANT_INVITE" Permission')
        .setColor('RED'));
      return;
    }
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
      method: "POST",
      body: JSON.stringify({
        max_age: 86400,
        max_uses: 0,
        target_application_id: "755600276941176913",
        target_type: 2,
        temporary: false,
        validate: null
      }),
      headers: {
        "Authorization": `Bot ${client.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(invite => {
        if (invite.error || !invite.code) return message.channel.send(new MessageEmbed()
          .setDescription('❌ | I Can\' Make Youtube Together')
          .setColor('RED'));
        var emi = new MessageEmbed()
          .setTitle('Success')
          .setDescription(`[Youtube](<https://discord.gg/${invite.code}>)`)
          .setColor('GREEN')
        message.channel.send(emi);
      })
      .catch(e => {
        message.channel.send(eme);
      })
  }
});
