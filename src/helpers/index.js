//@ts-check

const { loadCommands, getCommand, commands } = require("./commandHandler");
const { loadEvents, events } = require("./EventHandler")

module.exports = {
    loadCommands,
    commands,
    getCommand,
    loadEvents,
    events
}