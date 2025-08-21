const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRouter = require('./dRoute/auth.route.js');
const shoeRoute = require('./dRoute/shoes.route.js');
const OrderRoute = require('./dRoute/order.route.js');
const searchRoute = require('./dRoute/search.route.js');
const FavoriteRoute = require('./dRoute/favorite.route.js');
const CustomRoute = require('./dRoute/custom.router.js');

const { StartBot } = require('./config/bot.js');
const conectToDB = require('./config/db.js');
// const startBot2 = require('./config/bots.js');

const app = express();
dotenv.config();
app.use(cookieParser());

const { Telegraf, Markup } = require('telegraf');

const startBot2 = () => {

    const token = '8480268071:AAE7V-9uQ3Hnu1k_oFLTUgxYJIkiJ-xwjQg';
    const bot = new Telegraf(token);

    bot.start((ctx) => {
        const chatId = ctx.chat.id;
        console.log(chatId);

        ctx.reply('Welcome! This Is Solyana Shops.',
            Markup.inlineKeyboard([
                Markup.button.webApp('Shop Now', 'https://solyana.tekehabesha.com/')
            ])
        );
    });

    bot.launch();
    console.log('Bot is running...');
};

startBot2();

// Connect to the database
conectToDB();



app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/order', OrderRoute);
app.use('/api/shoes', shoeRoute);
app.use('/api/search', searchRoute);
app.use('/api/favorite', FavoriteRoute);
app.use('/api/upload', CustomRoute);

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../shoe.tekehabesha.com/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../shoe.tekehabesha.com//index.html'));
});

// Global error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 3000");
});