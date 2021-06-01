const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
const { Aki } = require("aki-api");
const emojis = require('../../../config/build.json')
const Started = new Set();

module.exports = {
        name: "akinator",
        description: "Akinator game",
        cooldown: 5,
        aliases: ["aki"],
        /* 
        ALL Copyrights Go's To: TheMaestro0: https://github.com/TheMaestro0/Akinator-Bot.git 
        */
        run: async(client, message, args) => {
                let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
                if (Blacklist === "on") return message.channel.send(new MessageEmbed()
                    .setColor(client.build.colors.err)
                    .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
                var prefix = await db.fetch(`prefix_${message.guild.id}`);
                if (prefix == null) prefix = client.config.bot.setting.main_prefix;
                if (!Started.has(message.author.id)) Started.add(message.author.id);
                else return message.channel.send(client.build.emojis.err + "** | The game already started..**");
                const aki = new Aki("ar");
                await aki.start();
                const msg = await message.channel.send(new MessageEmbed()
                        .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
                        .setColor(client.build.colors.warn)
                        .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `**${x} | ${emojis.aki[i]}**`).join("\n\n")}`));
    for (let emoji of emojis.aki) await msg.react(emoji).catch(console.error);
    const collector = msg.createReactionCollector((reaction, user) => emojis.aki.includes(reaction.emoji.name) && user.id === message.author.id, { time: 60000 * 6 });
    collector.on("collect", async (reaction, user) => {
      reaction.users.remove(user).catch(console.error);
      if (reaction.emoji.name == "❌") return collector.stop();

      await aki.step(emojis.aki.indexOf(reaction.emoji.name));
      if (aki.progress >= 70 || aki.currentStep >= 78) {
        await aki.win();
        collector.stop();
        message.channel.send(new MessageEmbed()
          .setTitle("This Your Carrcter, Right?")
          .setDescription(`**${aki.answers[0].name}**\nRanking as **#${aki.answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`)
          .setImage(aki.answers[0].absolute_picture_path)
          .setColor(client.build.colors.warn));
        message.channel.awaitMessages(response => ["yes", "y", "no", "n"].includes(response.content.trim().toLowerCase()) &&
          response.author.id == message.author.id, { max: 1, time: 30000, errors: ["time"] })
          .then(async (collected) => {
            const content = collected.first().content.trim().toLowerCase();
            if (content == "y")
              return message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.done)
                .setTitle(client.build.emojis.done + " Finali Iam The Winner!!"));
            else {
              message.channel.send(new MessageEmbed()
                .setColor(client.build.colors.err)
                .setTitle(client.build.emojis.err + "Okay, You won this time!")
              );
              var points = await db.fetch(`points_${message.guild.id}_${collected.first().author.id}`);
              if (points == null) points = db.set(`points_${message.guild.id}_${collected.first().author.id}`, {
                user: collected.first().author.id,
                guild: collected.first().author.id,
                points: 0
              })
              else {
                db.add(`points_${message.guild.id}_${collected.first().author.id}.points`, 1)
              }
              return;
            }
          });
        return;
      }
      msg.edit(new MessageEmbed()
        .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
        .setColor(client.build.colors.warn)
        .setDescription(`**${aki.question}**\n${aki.answers.map((x, i) => `**${x} | ${emojis.aki[i]}**`).join("\n\n")}`));
    });


    collector.on("end", () => {
      Started.delete(message.author.id);
      msg.delete({ timeout: 1000 }).catch(err => {
        console.log(err)
      });
    });
  }
};