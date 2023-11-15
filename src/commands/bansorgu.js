//@ts-check
const { CommandInteraction, EmbedBuilder, codeBlock } = require("discord.js");
const { guild: { role: { team } } } = require("../config.json");
const croxyDB = require("croxydb");

module.exports = {
    name: "bansorgu",
    description: "Altyapılar sunucusundan banlanan üye bilgilerini gösterir.",
    options: [
        {
            type: 3,
            name: "id",
            description: "Bir kullanıcı ID'si girin.",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        const client = interaction.client;
        let member = interaction.guild?.members.cache.get(interaction.user.id)

        if(member?.roles.cache.has(team) && croxyDB.fetch(`altyapiSunucusu`)) {
            let userId = interaction.options.get("id", true).value;
            let guild = await client.guilds.fetch(`${croxyDB.fetch(`altyapiSunucusu`).guildId}`);

            try {

            let banUser = await guild.bans.fetch(`${userId}`);
            
            if(banUser) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("Green")
                        .setAuthor({ name: `${banUser.user.tag}`, iconURL: `${banUser.user.avatarURL()}` })
                        .setFields([
                            {
                                name: "Neden banlandı;",
                                value: `${codeBlock("yaml", `${banUser.reason ||  `Bulunmuyor.`}`)}`,
                                inline: true
                            }
                        ])
                        .setTimestamp()
                        .setFooter({ text: `${interaction.user.tag} tarafından talep edildi.`, iconURL: `${interaction.user.avatarURL()}` })
                    ]
                })

            } else {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("Red")
                        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                        .setDescription(`❌ **|** Bu kullanıcı altyapı sunucusundan banlanmamış.`)
                        .setTimestamp()
                        .setFooter({ text: `${interaction.user.tag} tarafından talep edildi.`, iconURL: `${interaction.user.avatarURL()}` })
                    ]
                });
            }
            } catch {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("Red")
                        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                        .setDescription(`❌ **|** Bu kullanıcı altyapı sunucusundan banlanmamış.`)
                        .setTimestamp()
                        .setFooter({ text: `${interaction.user.tag} tarafından talep edildi.`, iconURL: `${interaction.user.avatarURL()}` })
                    ]
                });
            }
        } else {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                    .setDescription(`❌ **|** Bu komutu kullanmak için sunucu sahibi olman gerek.`)
                    .setTimestamp()
                    .setFooter({ text: `${interaction.user.tag} tarafından talep edildi.`, iconURL: `${interaction.user.avatarURL()}` })
                ]
            });

        }
    }
}