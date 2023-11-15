//@ts-check
const fs = require("fs");

let commands = [];

const loadCommands = () => {
    fs.readdirSync("src/commands").filter(file => file.endsWith(".js")).forEach((file) => {
        const Command = require(`../commands/${file}`);

        if(Command) {
            commands.push({ ...Command })
        }
    });
}
/**
 * 
 * @param {string} commandName 
 */
const getCommand = (commandName) => {
    let cmd = commands.find((command) => command.name === commandName);

    return cmd;
}

module.exports = {
    loadCommands,
    getCommand,
    commands
}