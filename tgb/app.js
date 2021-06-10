const { Telegraf } = require('telegraf')
const axios = require('axios')
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.telegram.sendMessage(ctx.chat.id, `Hey There, <b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b>!\nI'm <b>SST Inc. Bot</b>`, {parse_mode: "HTML"})) // display Welcome text when we start bot
bot.help((ctx) => ctx.telegram.sendMessage(ctx.chat.id, '<b>SST Inc. Bot</b>\nUse /commands to see all commands available', {parse_mode: "HTML"}))
//console.log(ctx.message.from.id);
bot.command('info', ctx => {
    ctx.reply(`Created by <b>Granwyn Tan</b>, from SST Inc., 2021, v2.1.0\nOpen sourced on <b>Github</b>`, {parse_mode: "HTML"})
})
bot.command('commands', (ctx) => {
    ctx.reply('<b>SST Inc. Bot</b>\nCommands Available:\n - /start\n - /help\n - /send\n - /random\n - /dice\n - /points\n - /admin\nor type slash \'/\'', {parse_mode: "HTML"})
})
bot.command('send', (ctx) => {
    msg = ctx.message.text
    if (msg.split(" ").length > 1) {
        ctx.reply(((msg.replace(new RegExp("/send", 'g'), "")).replace(new RegExp("/send", 'g'), "")).trim(" "))
    } else {
        ctx.reply("Usage is /send [text to send]")
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
        var leaderboard = [
            {firstName: "Ryan", lastName: "The", username: "theboii", points: 100},
            {firstName: "Granwyn", lastName: "Tan", username: "granwyntan", points: 50},
            {firstName: "Joe", lastName: "Wong", username: "DeathWarrior990", points: -1},
        ]
    
        if (msg.split(" ").length == 1){
            for (i = 0; i < leaderboard.length; i++) {
                if (leaderboard[i].username == ctx.message.from.username) {
                    ctx.reply(`<b>${leaderboard[i].firstName} ${leaderboard[i].lastName}</b> @${leaderboard[i].username}: ${leaderboard[i].points} Points`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
                    return
                }
            }
            leaderboard.push({firstName: `${ctx.message.from.first_name}`, lastName: `${ctx.message.from.last_name}`, username: `${ctx.message.from.username}`, points: 0})
            for (i = 0; i < leaderboard.length; i++) {
                if (leaderboard[i].username == ctx.message.from.username) {
                    ctx.reply(`<b>${leaderboard[i].firstName} ${leaderboard[i].lastName}</b> @${leaderboard[i].username}: ${leaderboard[i].points} Points`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
                    return
                }
            }
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
                final = `Points Leaderboard:\n`
                for (i = 0; i < leaderboard.length; i++) {
                    final += `${i+1}. <b>${leaderboard[i].firstName} ${leaderboard[i].lastName}</b> @${leaderboard[i].username}: ${leaderboard[i].points} Points\n`
                }
                ctx.reply(final, {parse_mode: "HTML"})
            } else {
                ctx.reply(`Feature is Currently Unavailable`)
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

bot.on('inline_query', async (ctx) => {
    query = ctx.inlineQuery.query
    url = `https://dev.to/api/articles?tag=${query}`
    url2 = `https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q=${query}`
    res = await axios.get(url)
    resultsArray = res.data
    // result = [
    //     {type: "article", id: 'help', title: "Help", input_message_content: {message_text: "/help"}, description: "Get Help"},
    //     {type: "article", id: 'start', title: "Start", input_message_content: {message_text: "/start"}, description: "Start Command"},
    //     {type: "article", id: 'cmds', title: "Commands", input_message_content: {message_text: "/help"}, description: "View Commands"},
    //     {type: "article", id: 'say', title: "Say", input_message_content: {message_text: "/say"}, description: "Tell Bot to Say Something"},
    //     {type: "article", id: 'send', title: "Send", input_message_content: {message_text: "/send"}, description: "Tell Bot to Send a Message"},
    //     {type: "article", id: 'rnd', title: "Random", input_message_content: {message_text: "/random"}, description: "Generate a Random Number from 0 to 1"},
    //     {type: "article", id: "dice", title: "Dice", input_message_content: {message_text: "/dice"}, description: "Roll a Dice"},
    //     {type: "article", id: "pts", title: "Points", input_message_content: {message_text: "/points"}, description: "View Points"}
    // ]
    result = resultsArray.map((elem, index) => {
        return {
            type: "article", id: String(index), title: elem.title, description: elem.description, input_message_content: {message_text: `${elem.title}\n${elem.description}\n${elem.url}`, url: elem.url}
        }
    })
    result2 =
    ctx.answerInlineQuery(result)
})

bot.launch() 