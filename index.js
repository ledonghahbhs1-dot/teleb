const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is required");

const log = (msg) => console.log("[" + new Date().toISOString() + "] " + msg);

// Only allow group and supergroup chats
function isGroupChat(msg) {
  return msg.chat.type === "group" || msg.chat.type === "supergroup";
}

// Middleware: reject private messages
function groupOnly(handler) {
  return (msg, match) => {
    if (!isGroupChat(msg)) {
      bot.sendMessage(
        msg.chat.id,
        "🚫 <b>This bot only works in group chats.</b>\n\nPlease add me to a group or supergroup to use my commands.",
        { parse_mode: "HTML" }
      );
      log("Rejected private message from " + (msg.from?.username || msg.chat.id));
      return;
    }
    handler(msg, match);
  };
}

let bot;

function startBot() {
  bot = new TelegramBot(token, {
    polling: {
      interval: 2000,
      autoStart: true,
      params: { timeout: 10 }
    }
  });

  bot.onText(/\/start/, groupOnly((msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from?.first_name ?? "there";
    bot.sendMessage(chatId,
      "👋 Hello, <b>" + firstName + "</b>!\n\n" +
      "🐉 Welcome to <b>WolfMod Bot</b>! 🎉\n\n" +
      "Here is a list of commands:\n\n" +
      "📜 /scriptfreedragoncity - Free Dragon City Script\n" +
      "💎 /scriptvipdragoncity - VIP Dragon City Script\n" +
      "🔑 /getfreekey - Get a free key\n" +
      "📖 /tutorial - How to use guide\n" +
      "💳 /paymentmethod - Payment methods\n" +
      "🛡 /gameguardian - Download GameGuardian\n" +
      "📱 /vphonegaga - Download VPhoneGaga\n" +
      "💻 /bluestack - Download BlueStack\n" +
      "❓ /help - View all commands",
      { parse_mode: "HTML" }
    );
    log("/start from " + (msg.from?.username || chatId) + " in group " + msg.chat.title);
  }));

  bot.onText(/\/help/, groupOnly((msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
      "📖 <b>Command List</b>\n\n" +
      "📜 /scriptfreedragoncity - Free Dragon City Script\n" +
      "💎 /scriptvipdragoncity - VIP Dragon City Script\n" +
      "🔑 /getfreekey - Get a free key\n" +
      "📖 /tutorial - How to use guide\n" +
      "💳 /paymentmethod - Payment methods\n" +
      "🛡 /gameguardian - Download GameGuardian\n" +
      "📱 /vphonegaga - Download VPhoneGaga\n" +
      "💻 /bluestack - Download BlueStack\n" +
      "🏠 /start - Welcome message\n" +
      "❓ /help - Show command list\n\n" +
      "⚡️ Contact: @wolfmodyt",
      { parse_mode: "HTML" }
    );
    log("/help from " + (msg.from?.username || chatId));
  }));

  bot.onText(/\/scriptfreedragoncity/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "📜 <b>Free Dragon City Script</b>\n\n🔗 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "📜 Get Free Script", url: "https://t.me/youtubewolfmod/311" }]] }
    });
    log("/scriptfreedragoncity from " + (msg.from?.username || msg.chat.id));
  }));

  bot.onText(/\/scriptvipdragoncity/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "💎 <b>VIP Dragon City Script</b>\n\n🔗 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "💎 Get VIP Script", url: "https://t.me/youtubewolfmod/299" }]] }
    });
  }));

  bot.onText(/\/getfreekey/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "🔑 <b>Get Free Key</b>\n\n🌐 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "🔑 Get Free Key", url: "https://www.wolfmod.xyz/get-free-key" }]] }
    });
  }));

  bot.onText(/\/tutorial/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "📖 <b>How To Use Guide</b>\n\n🔗 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "📖 View Tutorial", url: "https://t.me/c/2770498924/10617" }]] }
    });
  }));

  bot.onText(/\/paymentmethod/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id,
      "👉 <b>PAYMENT METHODS</b>\n\n" +
      "☑️ PayPal [GLOBAL]: contact.wolfmod@gmail.com\n" +
      "☑️ Binance ID [GLOBAL]: 1158594960\n" +
      "☑️ SociaBuzz TRIBE: <a href=\"https://sociabuzz.com/ldh/tribe\">LINK</a>\n" +
      "☑️ VCB (Vietcombank) [VIETNAM]: 9382382864 | LE DONG HA\n\n" +
      "☑️ Please send the correct information.\n" +
      "☑️ Please send by FRIENDS AND FAMILY OPTION !\n\n" +
      "After sending, please DM ⚡️ @wolfmodyt ⚡️ to confirm.",
      { parse_mode: "HTML" }
    );
  }));

  bot.onText(/\/gameguardian/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "🛡 <b>GameGuardian by WolfMod</b>\n\n🔗 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "🛡 Download GameGuardian", url: "https://www.mediafire.com/file/gb22k0yerlunq19/[GG_V101.1]+BY+WOLFMOD.zip/file" }]] }
    });
  }));

  bot.onText(/\/vphonegaga/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "📱 <b>VPhoneGaga Fix Rom</b>\n\n🔗 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "📱 Download VPhoneGaga", url: "https://www.mediafire.com/file/vgnkp09ib3nij0f/Vphonegaga_Fix_Rom.apk" }]] }
    });
  }));

  bot.onText(/\/bluestack/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "💻 <b>BlueStack</b>\n\n🔗 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "💻 Download BlueStack", url: "https://mega.nz/file/Wd0yQD6a#Df68i0BypTiQ7Spgk5jXx4j_ly-tm0dGnvMY_weVms8" }]] }
    });
  }));

  // Handle all non-command messages
  bot.on("message", (msg) => {
    const text = msg.text ?? "";
    if (text.startsWith("/")) return; // already handled above

    if (!isGroupChat(msg)) {
      bot.sendMessage(
        msg.chat.id,
        "🚫 <b>This bot only works in group chats.</b>\n\nPlease add me to a group or supergroup to use my commands.",
        { parse_mode: "HTML" }
      );
      return;
    }
    // Ignore non-command messages in groups (don't spam)
  });

  bot.on("polling_error", (err) => {
    if (err.code === "ETELEGRAM" && err.message.includes("409")) {
      log("Another instance detected (409). Waiting 15s before retrying...");
      bot.stopPolling();
      setTimeout(() => {
        log("Restarting polling...");
        bot.startPolling();
      }, 15000);
    } else {
      log("Polling error: " + err.message);
    }
  });

  log("✅ WolfMod Telegram Bot started! (Group-only mode)");
}

startBot();
