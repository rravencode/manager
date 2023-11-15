const { CommandInteraction } = require("discord.js");
const { commands, getCommand } = require("../helpers");

module.exports = {
    name: "interactionCreate",
    type: "on",
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        if(interaction.isCommand()) {
            let cmd = getCommand(interaction.commandName);

            if(cmd) {
                cmd.run(interaction)
            }
        }
    }
}