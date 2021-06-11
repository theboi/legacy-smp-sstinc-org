const { Telegraf } = require('telegraf')
const axios = require('axios');
var moment = require('moment'); // require
moment().format(); 
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.telegram.sendMessage(ctx.chat.id, `Hey There, <b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b>!\nI'm <b>SST Inc. Bot</b>`, {parse_mode: "HTML"})) // display Welcome text when we start bot
bot.help((ctx) => ctx.telegram.sendMessage(ctx.chat.id, '<b>SST Inc. Bot</b>\nUse /commands to see all commands available', {parse_mode: "HTML"}))
//console.log(ctx.message.from.id);
bot.command('info', ctx => {
    ctx.reply(`Developed by <b>Granwyn Tan</b>, SST Inc., 2021`, {parse_mode: "HTML"})
})

bot.command('commands', (ctx) => {
    ctx.reply('<b>SST Inc. Bot</b>\nCommands Available:\n - /start\n - /help\n - /send\n - /random\n - /dice\n - /points\n - /admin\nor type slash \'/\'', {parse_mode: "HTML"})
})
bot.command('send', (ctx) => {
    msg = ctx.message.text
    if (msg.split(" ").length > 1) {
        ctx.reply(((msg.replace(new RegExp("/send", 'g'), "")).replace(new RegExp("/send", 'g'), "")).trim(" ").replace("\"", ""))
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

var users = [
    {firstName: "Ryan", lastName: "The", username: "theboii", points: 100},
    {firstName: "Granwyn", lastName: "Tan", username: "granwyntan", points: 50},
    {firstName: "Ethan", lastName: "Chew", username: "ethancheww", points: 20},
    {firstName: "Joe", lastName: "Wong", username: "DeathWarrior990", points: -1}
]

bot.command('points', function(ctx, next){
        msg = ctx.message.text
        
        if (msg.split(" ").length == 1){
            for (i = 0; i < users.length; i++) {
                if (users[i].username == ctx.message.from.username) {
                    ctx.reply(`<b>${users[i].firstName} ${users[i].lastName}</b> @${users[i].username}: ${users[i].points} Points`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
                    return
                }
            }
            users.push({firstName: `${ctx.message.from.first_name}`, lastName: `${ctx.message.from.last_name}`, username: `${ctx.message.from.username}`, points: 0, absent: false})
            for (i = 0; i < users.length; i++) {
                if (users[i].username == ctx.message.from.username) {
                    ctx.reply(`<b>${users[i].firstName} ${users[i].lastName}</b> @${users[i].username}: ${users[i].points} Points`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
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
            } else if (second == "leaderboard" || second == "l"){
                final = `Points Leaderboard:\n`
                for (i = 0; i < users.length; i++) {
                    final += `${i+1}. <b>${users[i].firstName} ${users[i].lastName}</b> @${users[i].username}: ${users[i].points} Points\n`
                }
                ctx.reply(final, {parse_mode: "HTML"})
            } else if (second.startsWith("@")) {
                for (i = 0; i < users.length; i++) {
                    if (users[i].username == second.replace("@", "")) {
                        ctx.reply(`<b>${users[i].firstName} ${users[i].lastName}</b> @${users[i].username}: ${users[i].points} Points`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
                        return
                    }
                }
                ctx.reply(`User ${second} Not Found`)
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

bot.command('absent', function(ctx, next){
    msg = ctx.message.text
    components = msg.split(" ")
    length = components.length
    console.log(length)
    if (length != 3 && length != 4) {
        if (length == 1) {
            ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username} please provide a <b>valid date of absence</b> as well as a <b>valid reason for absence</b>\nThank you!`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
        }
        if (length == 2) {
            ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username} please provide a <b>valid date of absence</b> or a <b>valid reason for absence</b>.\nThank you!`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
        }
        ctx.reply(`Usage is /absent "[name]" [date of absence (DD/MM or DD/MM/YYYY)]* [valid reason (to be approved, exco will contact you separately if rejected)]*\n* Denotes compulsory field`, {parse_mode: "HTML"})
    } else {
        if (length == 3) {
            date = components[1]
            datecomponents = date.split("/")
            year = 2021
            if (datecomponents.length > 2) { // if got year
                if (datecomponents[2].length == 2) { // if year is YY, e.g. 21
                    year = parseInt("20"+datecomponents[2]);
                } else if (datecomponents[2].length == 4){ // if year is YYYY, e.g. 2021
                    year = datecomponents[2]
                } else {
                    ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username} Date must be in the format of DD/MM or DD/MM/YYYY`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
                    return
                }
            }
            month = datecomponents[1]
            day = datecomponents[0]
            dateobj = new Date(year,month-1,day,15,30,00,0)
            ctx.reply(`Dear <b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b>,\nYour absence on ${dateobj} has been recorded.\nThe exco will contact you seperately if your application for absence gets rejected.\nThank you and have a nice day!`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
            console.log(moment('2021-06-12').toDate())
        } else {
            date = components[2]
        }
    }
})

// bot.command('unabsent', function(ctx, next){
//     msg = ctx.message.text
//     components = msg.split(" ")
//     length = components.length
//     if (length < 3 || length > 3) {
//         if (length == 1) {
//             ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username} please provide a <b>valid date of absence</b> as well as a <b>valid reason for absence</b>\nThank you!`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
//         }
//         if (length == 2) {
//             ctx.reply(`<b>${ctx.message.from.first_name} ${ctx.message.from.last_name}</b> @${ctx.message.from.username} please provide a <b>valid date of absence</b> or a <b>valid reason for absence</b>.\nThank you!`, {reply_to_message_id : ctx.message.message_id, parse_mode: "HTML"})
//         }
//         ctx.reply(`Usage is /unabsent [name] @[username] [date of absence]* [valid reason (to be approved, exco will contact you separately if rejected)]*\n* Denotes compulsory field`, {parse_mode: "HTML"})
//     }
// })

bot.command('user', function(ctx, next){
    
})

// bot.command('inline_keyboard', (ctx) => {
//     ctx.telegram.sendMessage(ctx.chat.id, `Multiple Choice Quiz (Points: ${String(points)})`, {
//         reply_markup: {
//             inline_keyboard: [
//                 [{text: "sstinc.org", url: "https://sstinc.org"}, {text: "Delete Message Above", callback_data: ctx.deleteMessage()}, {text: "Add", callback_data: "MCQ3"}, {text: "Subtract", url: "https://sstinc.org", callback_data: "MCQ4"}]
//             ]
//         }
//     })
// })

// bot.action('MCQ2', (ctx) => {
//     ctx.deleteMessage()
//     ctx.reply("You Clicked MCQ 2")
// })
// bot.action('MCQ3', (ctx) => {
//     points += 1
//     ctx.editMessageText(ctx.chat.id, `Multiple Choice Quiz (Points: ${String(points)})`)
//     ctx.reply("You Clicked MCQ 3")
// })
// bot.action('MCQ4', (ctx) => {
//     points -= 1
//     ctx.editMessageText = `Multiple Choice Quiz (Points: ${String(points)})`
//     ctx.reply("You Clicked MCQ 4")
// })

bot.on('inline_query', async (ctx) => {
    query = ctx.inlineQuery.query
    url = `https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q=${query}`
    res = await axios.get(url)
    resultsArray = res.data.items
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
    // tagsArray = res.data.items
    // tags = ""
    // for (i = 0; i < tagsArray.length; i++){
    //     if (i != tagsArray.length-1){
    //         tags += tagsArray[i]
    //         tags += ' '
    //     } else {
    //         tags += tagsArray[i]
    //     }
    // }
    
    result = resultsArray.map((elem, index) => {
        // return {
        //     type: "article", id: String(index), title: elem.title, description: elem.description, input_message_content: {message_text: `${elem.title}\n${elem.description}\n${elem.url}`, url: elem.url}
        // }
        return {
            type: "article", id: String(index), title: elem.title, description: `by ${elem.owner.display_name}`, input_message_content: {message_text: `Title: ${elem.title}\nby ${elem.owner.display_name}\nTags: ${elem.tags}\n${elem.link}` , url: elem.link,}
        }
    })
    ctx.answerInlineQuery(result)
})

bot.launch() 