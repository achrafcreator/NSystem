const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "xo",
    description: "Play Xo With Frends",
    cooldown: 5,
    aliases: [""],

    run: async(client, message, args) => {
        let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);
        if (Blacklist === "on") return message.channel.send(new MessageEmbed()
            .setColor(client.build.colors.err)
            .setDescription(client.build.emojis.err + " **You Got Blacklisted!**"));
        var prefix = await db.fetch(`prefix_${message.guild.id}`);
        if (prefix == null) prefix = client.config.bot.setting.main_prefix;
        let array_of_mentions = message.mentions.users.array();
        let symbols = [":o:", ":heavy_multiplication_x:"];
        var grid_message;

        if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
            let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
            let random2 = Math.abs(random1 - 1);
            if (array_of_mentions.length == 1) {
                random1 = 0;
                random2 = 0;
            }
            var player1_id = message.author.id;
            let player2_id = array_of_mentions[random2].id;
            var turn_id = player1_id;
            var symbol = symbols[0];
            let initial_message = `اللعبة بين اللاعبين التاليين <@${player1_id}> and <@${player2_id}>!`;
            if (player1_id == player2_id) {
                initial_message += "\n_(بتلعب مع نفسك علشان توزد النقاط عليا الطلاق لأفضحك 😂)_";
            }
            message.channel
                .send(`Xo ${initial_message}`)
                .then(console.log("Successful tictactoe introduction"))
                .catch(console.error);
            message.channel
                .send(
                    ":one::two::three:" +
                    "\n" +
                    ":four::five::six:" +
                    "\n" +
                    ":seven::eight::nine:"
                )
                .then(new_message => {
                    grid_message = new_message;
                })
                .then(console.log("Successful tictactoe game initialization"))
                .catch(console.error);
            message.channel.send("Loading... Please wait for the :ok: reaction.")
                .then(async new_message => {
                    await new_message.react("1⃣");
                    await new_message.react("2⃣");
                    await new_message.react("3⃣");
                    await new_message.react("4⃣");
                    await new_message.react("5⃣");
                    await new_message.react("6⃣");
                    await new_message.react("7⃣");
                    await new_message.react("8⃣");
                    await new_message.react("9⃣");
                    await new_message.react("🆗");
                    await new_message.edit(`It\'s <@${turn_id}>\'s اشتغل! الرمز هو ${symbol}`)
                        .then(new_new_message => {
                            require("../../../data/xo")(
                                client,
                                message,
                                new_new_message,
                                player1_id,
                                player2_id,
                                turn_id,
                                symbol,
                                symbols,
                                grid_message
                            );
                        }).then(console.log("Successful tictactoe listeprefix initialization")).catch(console.error);
                }).then(console.log("Successful tictactoe react initialization")).catch(console.error);
        } else {
            message.channel.send(`plz mention sameone`).then(console.log("Successful error reply")).catch(console.error);
        }
    }
};