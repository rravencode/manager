//@ts-check
const { distance, closest } = require('fastest-levenshtein')
const { CommandInteraction, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, channelLink, ButtonStyle } = require("discord.js");
const croxyDB = require("croxydb");

module.exports = {
    name: "altyapıara",
    description: "Altyapılar sunucusundan bir altyapı arayın.",
    options: [
        {
            type: 3,
            name: "isim",
            description: "Altyapı ismi giriniz. (erensi, moderasyon)",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        const client = interaction.client;

        let guild = await client.guilds.fetch(`${croxyDB.fetch(`altyapiSunucusu`).guildId}`);
        let altyapıİsim = interaction.options.get("isim", true).value;

        if(guild) {
            const channelArr = guild.channels.cache.map((c) => c.name);
            const enYakinSonuc = closest(`${altyapıİsim}`, channelArr);
            const lisanslar = ["MIT", "GNU", "Creative Commons Zero"];

            const findChannel = guild.channels.cache.find((c) => c.name === enYakinSonuc);
            if(findChannel && findChannel.type !== ChannelType.GuildText) return;

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Blue")
                    .setTitle("Altyapı başarıyla bulundu.")
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setDescription("Aramaya çalıştığınız altyapıyı başarıyla buldum, işte bilgiler.")
                    .setFields([
                        {
                            name: "Altyapı ismi;",
                            value: "> "+ findChannel?.name ?? "Veri çekimi başarısız.",
                            inline: true
                        },
                        {
                            name: "Lisans türü;",
                            value: "> "+ lisanslar[Math.floor(Math.random() * lisanslar.length)],
                            inline: true
                        },
                        {
                            name: "Github hali var mı?",
                            value: "> "+ findChannel?.lastMessage?.content.includes("https://") ? "Evet, Github'da mevcut." : "Hayır, mevcut değil.",
                            inline: true
                        }
                    ])
                    .setTimestamp()
                    .setFooter({ text: `${interaction.user.username} tarafından talep edildi.`, iconURL: interaction.user.displayAvatarURL() })
                ],
                components: [
                    // @ts-ignore
                    new ActionRowBuilder().setComponents([
                        new ButtonBuilder()
                        .setURL(channelLink(findChannel?.id ?? "https://discord.gg/altyapilar"))
                        .setDisabled(findChannel?.id ? false : true)
                        .setEmoji({ name: "➡️" })
                        .setLabel("Altyapılar sunucusunda varım, beni oraya götür.")
                        .setStyle(ButtonStyle.Link)
                    ]).toJSON()
                ]
            })
        }
    }
}