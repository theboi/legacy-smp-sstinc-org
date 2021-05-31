const { Telegraf } = require('telegraf')
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.telegram.sendMessage(ctx.chat.id, `Hey There, <b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b>!\nI'm <b>SST Inc. Bot</b>`, {parse_mode: "HTML"})) // display Welcome text when we start bot
bot.help((ctx) => ctx.telegram.sendMessage(ctx.chat.id, '<b>SST Inc. Bot</b>\nUse /commands to see all commands available', {parse_mode: "HTML"}))
bot.command('info', ctx => {
    ctx.reply(`Created by <b>Granwyn Tan</b>, from SST Inc., 2021, v2.1.0\nOpen sourced on <b>Github</b>`, {parse_mode: "HTML"})
})
bot.command('commands', (ctx) => {
    ctx.reply('<b>SST Inc. Bot</b>\nCommands Available:\n - /start\n - /help\n - /send\n - /random\n - /dice\n - /points\n - /admin', {parse_mode: "HTML"})
})
bot.command('send', (ctx) => {
    msg = ctx.message.text
    if (msg.split(" ").length > 1) {
        ctx.reply(((msg.replace(new RegExp("/send", 'g'), "")).replace(new RegExp("/send", 'g'), "")).trim(" "))
    } else {
        ctx.reply("Use /send [text_to_send]")
    }
})
bot.command('random', ctx => {
    ctx.reply(Math.random())
})

bot.command('dice', ctx => {
    ctx.replyWithDice()
})

bot.command('points', function(ctx, next){
        msg = ctx.message.text
    
        if (msg.split(" ").length == 1){
            ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username}: X Points`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
        } else {
            second = msg.split(" ")[1];
            third = msg.split(" ")[2];
            if (second == "add" || second == "minus" || second == "deduct" || second == "plus"){
                bot.telegram.getChatAdministrators(ctx.chat.id).then(function(data){
                    if( !data || !data.length ) return;
                    console.log('admin list:', data);
                    ctx.chat._admins = data;
                    ctx.from._is_in_admin_list = data.some( adm => adm.user.id === ctx.from.id );
                    if(ctx.from._is_in_admin_list){
                        ctx.reply(`${third} points ${second}ed for @${ctx.message.from.username}`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"});
                        ctx.reply(`@${ctx.message.from.username} now has X points`, {parse_mode: "HTML"});
                    } else {
                        ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username} you do not have permissions to give, deduct or manage points`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"});
                    }
                })
                .catch(console.log)
                .then(_ => next(ctx));
                console.log(ctx.from._is_in_admin_list)
            }   
            else if (msg.split(" ")[1] == "leaderboard" || msg.split(" ")[1] == "l"){
                ctx.reply("Points Leaderboard:\n<b>Placeholder Name</b> username: X Points")
            }
        }
    })

bot.command('admin', function(ctx, next){
    if(ctx.chat.type == "private"){return;}
    console.log("came here")
    console.log(ctx.message.from);
    bot.telegram.getChatAdministrators(ctx.chat.id).then(function(data){
        if( !data || !data.length ) return;
        console.log('admin list:', data);
        ctx.chat._admins = data;
        ctx.from._is_in_admin_list = data.some( adm => adm.user.id === ctx.from.id );
        if(ctx.from._is_in_admin_list){
            ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username} is an <b>admin</b>`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"});
        } else {
            ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username} is <i>not</i> an <b>admin</b>`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"});
        }
    })
    .catch(console.log)
    .then(_ => next(ctx));
    console.log(ctx.from._is_in_admin_list)
})

bot.launch() 