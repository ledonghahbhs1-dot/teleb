const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is required");

const bot = new TelegramBot(token, { polling: true });

const log = (msg) => console.log(`[${new Date().toISOString()}] ${msg}`);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name ?? "there";
  const text = `👋 Hello, *${firstName}*\!

🐉 Welcome to *WolfMod Bot*\! 🎉

Here is a list of commands you can use:

📜 /scriptfreedragoncity \- Free Dragon City Script
💎 /scriptvipdragoncity \- VIP Dragon City Script
🔑 /getfreekey \- Get a free key
📖 /tutorial \- How to use guide
💳 /paymentmethod \- Payment methods
🛡 /gameguardian \- Download GameGuardian
📱 /vphonegaga \- Download VPhoneGaga
💻 /bluestack \- Download BlueStack
❓ /help \- View all commands

Type /help to see more details\.`;
  bot.sendMessage(chatId, text, { parse_mode: "MarkdownV2" });
  log(`/start from ${msg.from?.username || chatId}`);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const text = `📖 *Command List*

📜 /scriptfreedragoncity \- Free Dragon City Script
💎 /scriptvipdragoncity \- VIP Dragon City Script
🔑 /getfreekey \- Get a free key
📖 /tutorial \- How to use guide
💳 /paymentmethod \- Payment methods
🛡 /gameguardian \- Download GameGuardian
📱 /vphonegaga \- Download VPhoneGaga
💻 /bluestack \- Download BlueStack
🏠 /start \- Welcome message
❓ /help \- Show command list \(this command\)

⚡️ Contact: @wolfmodyt`;
  bot.sendMessage(chatId, text, { parse_mode: "MarkdownV2" });
  log(`/help from ${msg.from?.username || chatId}`);
});

bot.onText(/\/scriptfreedragoncity/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `📜 *Free Dragon City Script*

🔗 Click the link below to get the free script:
👉 https://t\.me/youtubewolfmod/311`, {
    parse_mode: "MarkdownV2",
    reply_markup: { inline_keyboard: [[{ text: "📜 Get Free Script", url: "https://t.me/youtubewolfmod/311" }]] }
  });
  log(`/scriptfreedragoncity from ${msg.from?.username || chatId}`);
});

bot.onText(/\/scriptvipdragoncity/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `💎 *VIP Dragon City Script*

🔗 Click the link below to get the VIP script:
👉 https://t\.me/youtubewolfmod/299`, {
    parse_mode: "MarkdownV2",
    reply_markup: { inline_keyboard: [[{ text: "💎 Get VIP Script", url: "https://t.me/youtubewolfmod/299" }]] }
  });
});

bot.onText(/\/getfreekey/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🔑 *Get Free Key*

🌐 Visit the website below to get your free key:
👉 https://www\.wolfmod\.xyz/get\-free\-key`, {
    parse_mode: "MarkdownV2",
    reply_markup: { inline_keyboard: [[{ text: "🔑 Get Free Key", url: "https://www.wolfmod.xyz/get-free-key" }]] }
  });
});

bot.onText(/\/tutorial/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `📖 *How To Use Guide*

🔗 Click the link below to view the full tutorial:
👉 https://t\.me/c/2770498924/10617`, {
    parse_mode: "MarkdownV2",
    reply_markup: { inline_keyboard: [[{ text: "📖 View Tutorial", url: "https://t.me/c/2770498924/10617" }]] }
  });
});

bot.onText(/\/paymentmethod/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `👉*PAYMENT METHODS*

☑️ PayPal \[GLOBAL\]: contact\.wolfmod@gmail\.com
☑️ Binance ID \[GLOBAL\]: 1158594960
☑️ SociaBuzz TRIBE: [LINK](https://sociabuzz.com/ldh/tribe)
☑️ VCB \(Vietcombank\) \[VIETNAM\]: 9382382864 \| LE DONG HA

☑️ Please send the correct information\.
☑️ Please send by FRIENDS AND FAMILY OPTION \!

After sending, please DM ⚡️:@wolfmodyt⚡️ to confirm your submission\.`, { parse_mode: "MarkdownV2" });
});

bot.onText(/\/gameguardian/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🛡 *GameGuardian by WolfMod*

🔗 Click the link below to download:
👉 https://www\.mediafire\.com/file/gb22k0yerlunq19/\[GG\_V101\.1\]\+BY\+WOLFMOD\.zip/file`, {
    parse_mode: "MarkdownV2",
    reply_markup: { inline_keyboard: [[{ text: "🛡 Download GameGuardian", url: "https://www.mediafire.com/file/gb22k0yerlunq19/[GG_V101.1]+BY+WOLFMOD.zip/file" }]] }
  });
});

bot.onText(/\/vphonegaga/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `📱 *VPhoneGaga Fix Rom*

🔗 Click the link below to download:
👉 https://www\.mediafire\.com/file/vgnkp09ib3nij0f/Vphonegaga\_Fix\_Rom\.apk`, {
    parse_mode: "MarkdownV2",
    reply_markup: { inline_keyboard: [[{ text: "📱 Download VPhoneGaga", url: "https://www.mediafire.com/file/vgnkp09ib3nij0f/Vphonegaga_Fix_Rom.apk" }]] }
  });
});

bot.onText(/\/bluestack/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `💻 *BlueStack*

🔗 Click the link below to download:
👉 https://mega\.nz/file/Wd0yQD6a\#Df68i0BypTiQ7Spgk5jXx4j\_ly\-tm0dGnvMY\_weVms8`, {
    parse_mode: "MarkdownV2",
    reply_markup: { inline_keyboard: [[{ text: "💻 Download BlueStack", url: "https://mega.nz/file/Wd0yQD6a#Df68i0BypTiQ7Spgk5jXx4j_ly-tm0dGnvMY_weVms8" }]] }
  });
});

bot.on("polling_error", (err) => log("Polling error: " + err.message));

bot.on("message", (msg) => {
  const text = msg.text ?? "";
  if (!text.startsWith("/")) {
    bot.sendMessage(msg.chat.id, "I didn't understand that. Type /help to see available commands.");
  }
});

log("✅ WolfMod Telegram Bot started!");
