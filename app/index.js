const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const db = require('../config/db');

// User model
const User = require('./models/User');

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongo connected!'))
    .catch(err => console.log(err));

// token
const token = require('../config/token');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
    polling: true,
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    User.findOne({ chat_id: chatId })
        .then(user => {
            if(user) {
                bot.sendMessage(chatId, 'You re already signed... 🐣');
            } else {
                const newUser = new User({
                   chat_id: chatId
                });
                newUser.save()
                    .then(() => bot.sendMessage(chatId, 'Now you re signed and will get notifications!!! 👍🐳'))
                    .catch(err => bot.sendMessage(chatId, `${err} Oops... Nothing happened. Email this guy: artem.abdulaev@gmail.com`));
            }
        });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});