const { Telegraf } = require('telegraf')
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.telegram.sendMessage(ctx.chat.id, `Hey There, <b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b>!\nI'm <b>SST Inc. Bot</b>`, {parse_mode: "HTML"})) // display Welcome text when we start bot
bot.help((ctx) => ctx.telegram.sendMessage(ctx.chat.id, '<b>SST Inc. Bot</b>\nUse /commands to see all commands available', {parse_mode: "HTML"}))
bot.command('info', ctx => {
    ctx.reply(`Created by <b>Granwyn Tan</b>, from SST Inc., 2021, v2.1.0\nOpen sourced on <b>Github</b>`, {parse_mode: "HTML"})
})
bot.launch() 