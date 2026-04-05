import TelegramBot from "node-telegram-bot-api";
import { logger } from "./lib/logger";

const token = process.env["TELEGRAM_BOT_TOKEN"];

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN environment variable is required.");
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name ?? "there";

  const welcomeMessage = `👋 Hello, *${firstName}*\\!

🐉 Welcome to *WolfMod Bot*\\! 🎉

Here is a list of commands you can use:

📜 /scriptfreedragoncity \\- Free Dragon City Script
💎 /scriptvipdragoncity \\- VIP Dragon City Script
🔑 /getfreekey \\- Get a free key
📖 /tutorial \\- How to use guide
💳 /paymentmethod \\- Payment methods
🛡 /gameguardian \\- Download GameGuardian
📱 /vphonegaga \\- Download VPhoneGaga
💻 /bluestack \\- Download BlueStack
❓ /help \\- View all commands

Type /help to see more details\\.`;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: "MarkdownV2" });
  logger.info({ chatId, command: "/start" }, "User started the bot");
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  const helpMessage = `📖 *Command List*

📜 /scriptfreedragoncity \\- Free Dragon City Script
💎 /scriptvipdragoncity \\- VIP Dragon City Script
🔑 /getfreekey \\- Get a free key
📖 /tutorial \\- How to use guide
💳 /paymentmethod \\- Payment methods
🛡 /gameguardian \\- Download GameGuardian
📱 /vphonegaga \\- Download VPhoneGaga
💻 /bluestack \\- Download BlueStack
🏠 /start \\- Welcome message
❓ /help \\- Show command list \\(this command\\)

⚡️ Contact: @wolfmodyt`;

  bot.sendMessage(chatId, helpMessage, { parse_mode: "MarkdownV2" });
  logger.info({ chatId, command: "/help" }, "User requested help");
});

bot.onText(/\/scriptfreedragoncity/, (msg) => {
  const chatId = msg.chat.id;

  const message = `📜 *Free Dragon City Script*

🔗 Click the link below to get the free script:
👉 https://t\\.me/youtubewolfmod/311`;

  bot.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📜 Get Free Script", url: "https://t.me/youtubewolfmod/311" }],
      ],
    },
  });
  logger.info({ chatId, command: "/scriptfreedragoncity" }, "User requested free script");
});

bot.onText(/\/scriptvipdragoncity/, (msg) => {
  const chatId = msg.chat.id;

  const message = `💎 *VIP Dragon City Script*

🔗 Click the link below to get the VIP script:
👉 https://t\\.me/youtubewolfmod/299`;

  bot.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "💎 Get VIP Script", url: "https://t.me/youtubewolfmod/299" }],
      ],
    },
  });
  logger.info({ chatId, command: "/scriptvipdragoncity" }, "User requested VIP script");
});

bot.onText(/\/getfreekey/, (msg) => {
  const chatId = msg.chat.id;

  const message = `🔑 *Get Free Key*

🌐 Visit the website below to get your free key:
👉 https://www\\.wolfmod\\.xyz/get\\-free\\-key`;

  bot.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔑 Get Free Key", url: "https://www.wolfmod.xyz/get-free-key" }],
      ],
    },
  });
  logger.info({ chatId, command: "/getfreekey" }, "User requested free key");
});

bot.onText(/\/tutorial/, (msg) => {
  const chatId = msg.chat.id;

  const message = `📖 *How To Use Guide*

🔗 Click the link below to view the full tutorial:
👉 https://t\\.me/c/2770498924/10617`;

  bot.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📖 View Tutorial", url: "https://t.me/c/2770498924/10617" }],
      ],
    },
  });
  logger.info({ chatId, command: "/tutorial" }, "User requested tutorial");
});

bot.onText(/\/paymentmethod/, (msg) => {
  const chatId = msg.chat.id;

  const message = `👉*PAYMENT METHODS*

☑️ PayPal \\[GLOBAL\\]: contact\\.wolfmod@gmail\\.com
☑️ Binance ID \\[GLOBAL\\]: 1158594960
☑️ SociaBuzz TRIBE: [LINK](https://sociabuzz.com/ldh/tribe)
☑️ VCB \\(Vietcombank\\) \\[VIETNAM\\]: 9382382864 \\| LE DONG HA

☑️ Please send the correct information\\.
☑️ Please send by FRIENDS AND FAMILY OPTION \\!

After sending, please DM ⚡️:@wolfmodyt⚡️ to confirm your submission\\.`;

  bot.sendMessage(chatId, message, { parse_mode: "MarkdownV2" });
  logger.info({ chatId, command: "/paymentmethod" }, "User requested payment method");
});

bot.onText(/\/gameguardian/, (msg) => {
  const chatId = msg.chat.id;

  const message = `🛡 *GameGuardian by WolfMod*

🔗 Click the link below to download:
👉 https://www\\.mediafire\\.com/file/gb22k0yerlunq19/\\[GG\\_V101\\.1\\]\\+BY\\+WOLFMOD\\.zip/file`;

  bot.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🛡 Download GameGuardian", url: "https://www.mediafire.com/file/gb22k0yerlunq19/[GG_V101.1]+BY+WOLFMOD.zip/file" }],
      ],
    },
  });
  logger.info({ chatId, command: "/gameguardian" }, "User requested GameGuardian");
});

bot.onText(/\/vphonegaga/, (msg) => {
  const chatId = msg.chat.id;

  const message = `📱 *VPhoneGaga Fix Rom*

🔗 Click the link below to download:
👉 https://www\\.mediafire\\.com/file/vgnkp09ib3nij0f/Vphonegaga\\_Fix\\_Rom\\.apk`;

  bot.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📱 Download VPhoneGaga", url: "https://www.mediafire.com/file/vgnkp09ib3nij0f/Vphonegaga_Fix_Rom.apk" }],
      ],
    },
  });
  logger.info({ chatId, command: "/vphonegaga" }, "User requested VPhoneGaga");
});

bot.onText(/\/bluestack/, (msg) => {
  const chatId = msg.chat.id;

  const message = `💻 *BlueStack*

🔗 Click the link below to download:
👉 https://mega\\.nz/file/Wd0yQD6a\\#Df68i0BypTiQ7Spgk5jXx4j\\_ly\\-tm0dGnvMY\\_weVms8`;

  bot.sendMessage(chatId, message, {
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [
        [{ text: "💻 Download BlueStack", url: "https://mega.nz/file/Wd0yQD6a#Df68i0BypTiQ7Spgk5jXx4j_ly-tm0dGnvMY_weVms8" }],
      ],
    },
  });
  logger.info({ chatId, command: "/bluestack" }, "User requested BlueStack");
});

bot.on("polling_error", (error) => {
  logger.error({ error: error.message }, "Telegram polling error");
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text ?? "";

  if (!text.startsWith("/")) {
    bot.sendMessage(
      chatId,
      "I didn't understand that message. Type /help to see the list of available commands.",
    );
    logger.info({ chatId, text }, "Received unknown message");
  }
});

logger.info("Telegram bot started with polling");

export default bot;
