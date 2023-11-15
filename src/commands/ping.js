//@ts-check
const { CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "websocket",
    description: "Bot'un websocket gecikmesini öğrenebilirsiniz.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: (interaction) => {
        const client = interaction.client;

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("Blurple")
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}` })
                .setDescription(`🎾 **|** Pong, websocket gecikmem **${client.ws.ping} milisaniye**`)
                .setTimestamp()
                .setFooter({ text: `${interaction.user.tag} tarafından talep edildi.`, iconURL: `${interaction.user.avatarURL()}` })
            ]
        })
    }
}