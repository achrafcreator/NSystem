const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const chalk = require('chalk');



/**
 * if (lang2 == "arabic") {}
 * if (lang2 == "english") {}
 */

module.exports = {
    name: "help",
    cooldown: 5,
    aliases: ["help"],

    run: async(client, message, args) => {
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") {
            message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.err)
                .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"))
            return;
        }
        let embed = new MessageEmbed()
            .addField(`Misc 💫`, '`help`, `prefix`, `support`')
            .addField('Level System 🚿', '`remove-level-role`, `add-level-role`, `disable-level-system`, `set-level-channel`, `set-level-message`, `reset-all`, `rank`, `levels-leaderboard`')
            .addField('Reaction Roles 🌈', '`set-message`, `add-react`')
            .addField('General Commands 🙍‍♂️', '`avatar`, `server`, `invite`, `user`')
            .addField('Giveaway Commands 🎉', '`gstart`, `groll`, `gend`')
            .addField('Moderation ⚔️', '`add-emoji`, `slow-mode`, `role`, `remove-role`, `files-only`, `ban`, `unban`, `kick`, `mute`, `unmute`, `clear`, `warn`, `lock`, `unlock`, `hide`, `show`, `createcolors`, `set-auto-responce`, `set-auto-role`')
            .addField('Welcome System 👋', '`set-welcome`')
            .addField('Games System 🎮', '`8ball`, `brand`, `capitals`, `coinflip`, `cut`, `emojis`, `fast`, `fkk`, `flags`, `fruits`, `hack`, `hug`, `kill`, `kiss`, `love`, `math`, `puzzle`, `sara7a`, `translate`, `trash`, `xo`, `drake`, `slap`, `points`, `games-leaderboard`, `triggered`, `bed`, `delete`, `egg`')
            .addField('Economy System 💰', '`credits`, `daily`, `profile`')
            .addField('Music Sysyem 🎶', '`play`, `skip`, `stop`, `pause`, `resume`, `search`, `volume`, `nowplaying`, `queue`, `loop`, `youtube`')
            .addField('Ticket System 🎫', '`new`, `add`, `remove`, `close`, `ticket-setup`')
            .setColor(client.build.colors.warn)
        return message.channel.send(embed)
    }
};
