const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is required");

const bot = new TelegramBot(token, { polling: true });
const log = (msg) => console.log("[" + new Date().toISOString() + "] " + msg);

const html = (strings, ...vals) => strings.reduce((acc, s, i) => acc + s + (vals[i] ?? ""), "");

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name ?? "there";
  bot.sendMessage(chatId, html`👋 Hello, <b>${firstName}</b>!

🐉 Welcome to <b>WolfMod Bot</b>! 🎉

Here is a list of commands:

📜 /scriptfreedragoncity - Free Dragon City Script
💎 /scriptvipdragoncity - VIP Dragon City Script
🔑 /getfreekey - Get a free key
📖 /tutorial - How to use guide
💳 /paymentmethod - Payment methods
🛡 /gameguardian - Download GameGuardian
📱 /vphonegaga - Download VPhoneGaga
💻 /bluestack - Download BlueStack
❓ /help - View all commands`, { parse_mode: "HTML" });
  log("/start from " + (msg.from?.username || chatId));
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `📖 <b>Command List</b>

📜 /scriptfreedragoncity - Free Dragon City Script
💎 /scriptvipdragoncity - VIP Dragon City Script
🔑 /getfreekey - Get a free key
📖 /tutorial - How to use guide
💳 /paymentmethod - Payment methods
🛡 /gameguardian - Download GameGuardian
📱 /vphonegaga - Download VPhoneGaga
💻 /bluestack - Download BlueStack
🏠 /start - Welcome message
❓ /help - Show command list

⚡️ Contact: @wolfmodyt`, { parse_mode: "HTML" });
  log("/help from " + (msg.from?.username || chatId));
});

bot.onText(/\/scriptfreedragoncity/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `📜 <b>Free Dragon City Script</b>

🔗 Click the link below to get the free script:`, {
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "📜 Get Free Script", url: "https://t.me/youtubewolfmod/311" }]] }
  });
  log("/scriptfreedragoncity from " + (msg.from?.username || chatId));
});

bot.onText(/\/scriptvipdragoncity/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `💎 <b>VIP Dragon City Script</b>

🔗 Click the link below to get the VIP script:`, {
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "💎 Get VIP Script", url: "https://t.me/youtubewolfmod/299" }]] }
  });
  log("/scriptvipdragoncity from " + (msg.from?.username || chatId));
});

bot.onText(/\/getfreekey/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🔑 <b>Get Free Key</b>

🌐 Visit the website below to get your free key:`, {
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "🔑 Get Free Key", url: "https://www.wolfmod.xyz/get-free-key" }]] }
  });
  log("/getfreekey from " + (msg.from?.username || chatId));
});

bot.onText(/\/tutorial/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `📖 <b>How To Use Guide</b>

🔗 Click the link below to view the full tutorial:`, {
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "📖 View Tutorial", url: "https://t.me/c/2770498924/10617" }]] }
  });
  log("/tutorial from " + (msg.from?.username || chatId));
});

bot.onText(/\/paymentmethod/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `👉 <b>PAYMENT METHODS</b>

☑️ PayPal [GLOBAL]: contact.wolfmod@gmail.com
☑️ Binance ID [GLOBAL]: 1158594960
☑️ SociaBuzz TRIBE: <a href="https://sociabuzz.com/ldh/tribe">LINK</a>
☑️ VCB (Vietcombank) [VIETNAM]: 9382382864 | LE DONG HA

☑️ Please send the correct information.
☑️ Please send by FRIENDS AND FAMILY OPTION !

After sending, please DM ⚡️ @wolfmodyt ⚡️ to confirm your submission.`, { parse_mode: "HTML" });
  log("/paymentmethod from " + (msg.from?.username || chatId));
});

bot.onText(/\/gameguardian/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🛡 <b>GameGuardian by WolfMod</b>

🔗 Click the link below to download:`, {
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "🛡 Download GameGuardian", url: "https://www.mediafire.com/file/gb22k0yerlunq19/[GG_V101.1]+BY+WOLFMOD.zip/file" }]] }
  });
  log("/gameguardian from " + (msg.from?.username || chatId));
});

bot.onText(/\/vphonegaga/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `📱 <b>VPhoneGaga Fix Rom</b>

🔗 Click the link below to download:`, {
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "📱 Download VPhoneGaga", url: "https://www.mediafire.com/file/vgnkp09ib3nij0f/Vphonegaga_Fix_Rom.apk" }]] }
  });
  log("/vphonegaga from " + (msg.from?.username || chatId));
});

bot.onText(/\/bluestack/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `💻 <b>BlueStack</b>

🔗 Click the link below to download:`, {
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: [[{ text: "💻 Download BlueStack", url: "https://mega.nz/file/Wd0yQD6a#Df68i0BypTiQ7Spgk5jXx4j_ly-tm0dGnvMY_weVms8" }]] }
  });
  log("/bluestack from " + (msg.from?.username || chatId));
});

bot.on("polling_error", (err) => log("Polling error: " + err.message));

bot.on("message", (msg) => {
  const text = msg.text ?? "";
  if (!text.startsWith("/")) {
    bot.sendMessage(msg.chat.id, "I didn't understand that. Type /help to see available commands.");
  }
});

log("✅ WolfMod Telegram Bot started!");
