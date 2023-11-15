//@ts-check

const { Client } = require("discord.js");
const fs = require("fs");

let events = [];

/**
 * 
 * @param {Client} client 
 */
const loadEvents = (client) => {

    fs.readdirSync("src/events").filter(file => file.endsWith(".js")).forEach((file) => {
        const Event = require(`../events/${file}`);

        client[Event.type](Event.name, ( /** @type {any} */ ...args) => {
            Event.run(...args)
        });

        events.push({ ...Event })
    });
}

module.exports = {
    loadEvents,
    events
}