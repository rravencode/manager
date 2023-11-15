//@ts-check
const { CommandInteraction, EmbedBuilder } = require("discord.js");
const { guild: { role: { owner } } } = require("../config.json");
const croxyDB = require("croxydb");

module.exports = {
    name: "sunucudeğiştir",
    description: "Altyapılar sunucusunu değiştirir.",
    options: [
        {
            type: 3,
            name: "sunucu_id",
            description: "yeni altyapı sunucusunun ID'sini giriniz!",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: (interaction) => {
        const client = interaction.client;
        let member = interaction.guild?.members.cache.get(interaction.user.id)

        if(member?.roles.cache.has(owner)) {
            let guildId = interaction.options.get("sunucu_id", true).value;
            let guild = client.guilds.cache.get(`${guildId}`);

            if(guild) {
                croxyDB.set(`altyapiSunucusu`, { guildId: `${guildId}` })
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                        .setColor("Green")
                        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                        .setDescription(`✅ **|** Altyapı sunucusu başarıyla değiştirildi.`)
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
                        .setDescription(`❌ **|** Bu sunucuyu bulamıyor, lütfen beni o sunucuya ekleyin.`)
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