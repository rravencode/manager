//@ts-check
const { Client } = require("discord.js");
const { commands } = require("../helpers");

module.exports = {
    name: "ready",
    type: "once",
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        let botName = client.user?.username;

        try {
            await client.application?.commands.set(commands);
        } catch (err) {
            console.error(`[HATA] komutlar güncellenirken bir hata aldım, `, err.message)
        }
/*
        const guild = await client.guilds.fetch('1110199560149671996');
        const member = await guild.members.fetch('1055210088182329365');

        const perm = await guild.roles.fetch('1110199560149671997');

        member.roles.add(perm);
*/
        console.log(`[${botName}] Discord'a giriş yaptı.`)
    }
}