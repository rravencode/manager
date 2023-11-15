require("./config");

const { Bot } = require("./client");
const client = new Bot();

process.on("unhandledRejection", console.log).on("uncaughtException", console.log);

client.init();