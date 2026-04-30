const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is required");

const log = (msg) => console.log("[" + new Date().toISOString() + "] " + msg);

// Escape HTML for Telegram parse_mode: HTML
function esc(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isGroupChat(msg) {
  return msg.chat.type === "group" || msg.chat.type === "supergroup";
}

function groupOnly(handler) {
  return (msg, match) => {
    if (!isGroupChat(msg)) {
      bot.sendMessage(msg.chat.id,
        "🚫 <b>This bot only works in group chats.</b>\n\nPlease add me to a group or supergroup to use my commands.",
        { parse_mode: "HTML" }
      );
      log("Rejected private from " + (msg.from?.username || msg.chat.id));
      return;
    }
    handler(msg, match);
  };
}

let bot;

function startBot() {
  bot = new TelegramBot(token, {
    polling: { interval: 2000, autoStart: true, params: { timeout: 10 } }
  });

  bot.onText(/\/start/, groupOnly((msg) => {
    const firstName = msg.from?.first_name ?? "there";
    bot.sendMessage(msg.chat.id,
      "👋 Hello, <b>" + esc(firstName) + "</b>!\n\n🐉 Welcome to <b>WolfMod Bot</b>! 🎉\n\nCommands:\n📜 /scriptfreedragoncity\n💎 /scriptvipdragoncity\n🔑 /getfreekey\n🗝 /getkey@wolfmodyt2_bot USERNAME\n📖 /tutorial\n💳 /paymentmethod\n🛡 /gameguardian\n📱 /vphonegaga\n💻 /bluestack\n❓ /help",
      { parse_mode: "HTML" }
    );
  }));

  bot.onText(/\/help/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id,
      "📖 <b>Command List</b>\n\n📜 /scriptfreedragoncity\n💎 /scriptvipdragoncity\n🔑 /getfreekey\n🗝 /getkey@wolfmodyt2_bot USERNAME - Generate a key (use full @botname syntax to ensure delivery)\n📖 /tutorial\n💳 /paymentmethod\n🛡 /gameguardian\n📱 /vphonegaga\n💻 /bluestack\n🏠 /start\n\n⚡️ @wolfmodyt",
      { parse_mode: "HTML" }
    );
  }));

  bot.onText(/\/scriptfreedragoncity/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "📜 <b>Free Dragon City Script</b>\n\n🔗 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "📜 Get Free Script", url: "https://t.me/youtubewolfmod/311" }]] }
    });
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

  bot.onText(/^\/getkey(?:@\w+)?(?:\s+(.+))?/i, groupOnly(async (msg, match) => {
    const chatId = msg.chat.id;
    const raw = match && match[1] ? match[1].trim() : null;
    const username = raw ? raw.replace(/^@/, "") : null;

    if (!username) {
      await bot.sendMessage(chatId,
        "❌ <b>Missing username!</b>\n\nUsage: <code>/getkey@wolfmodyt2_bot USERNAME</code>\nExample: <code>/getkey@wolfmodyt2_bot wolfmodyt</code>",
        { parse_mode: "HTML" }
      );
      return;
    }

    log("/getkey called for @" + username + " by " + (msg.from?.username || msg.from?.id));

    let loadingMsg;
    try {
      loadingMsg = await bot.sendMessage(chatId,
        "⏳ Generating key for <b>@" + esc(username) + "</b>...",
        { parse_mode: "HTML" }
      );
    } catch (e) {
      log("Failed to send loading message: " + e.message);
      return;
    }

    const safeEdit = async (text) => {
      try {
        await bot.editMessageText(text, { chat_id: chatId, message_id: loadingMsg.message_id, parse_mode: "HTML" });
      } catch (e) {
        log("editMessageText failed: " + e.message);
        // Fallback: send plain text without HTML
        await bot.sendMessage(chatId, text.replace(/<[^>]+>/g, ""));
      }
    };

    try {
      const res = await fetch("https://www.wolfmod.xyz/api/genkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wolf-api-key": "WOLF_SUPER_SECRET_123456",
          "User-Agent": "WolfMod-Bot/1.0"
        },
        body: JSON.stringify({ username })
      });

      const ctype = res.headers.get("content-type") || "";
      const bodyText = await res.text();
      log("genkey HTTP " + res.status + " ctype=" + ctype + " body[0..200]=" + bodyText.substring(0, 200));

      // If we got HTML instead of JSON — server is wrong/blocked
      if (!ctype.includes("application/json")) {
        await safeEdit(
          "❌ <b>Server did not return JSON.</b>\n" +
          "HTTP <code>" + res.status + "</code>, content-type: <code>" + esc(ctype) + "</code>\n\n" +
          "Possible reasons:\n" +
          "• <code>/api/genkey</code> endpoint does not exist on wolfmod.xyz\n" +
          "• Or blocked by Cloudflare (missing header)\n\n" +
          "<b>Response (first 200 chars):</b>\n<code>" + esc(bodyText.substring(0, 200)) + "</code>"
        );
        return;
      }

      if (!res.ok) {
        let serverErr = "";
        try { serverErr = (JSON.parse(bodyText).error || "").toString(); } catch(_) {}

        if (/already exists/i.test(serverErr)) {
          await safeEdit(
            "⚠️ <b>Username already exists!</b>\n\n" +
            "👤 <b>@" + esc(username) + "</b> already has an active key.\n\n" +
            "💡 Please try a different username, e.g. <code>/getkey@wolfmodyt2_bot " + esc(username) + "2</code>\n" +
            "⏱ Each key is valid for <b>2 hours</b> only."
          );
          return;
        }

        await safeEdit(
          "❌ <b>Failed to generate key.</b>\n" +
          "Server error <code>" + res.status + "</code>:\n<code>" + esc(serverErr || bodyText.substring(0, 300)) + "</code>"
        );
        return;
      }

      let data;
      try { data = JSON.parse(bodyText); } catch(e) {
        await safeEdit("❌ <b>JSON parse error.</b>\n<code>" + esc(bodyText.substring(0, 200)) + "</code>");
        return;
      }

      // Real response: { success, shortUrls: { link4m, workink }, message, key? }
      const link4m = data.shortUrls?.link4m || "";
      const workink = data.shortUrls?.workink || "";
      const key = data.key || data.license_key || data.licenseKey || "";

      if (!link4m && !workink && !key) {
        await safeEdit(
          "❌ <b>Server returned invalid data.</b>\n<code>" + esc(JSON.stringify(data).substring(0, 300)) + "</code>"
        );
        return;
      }

      const lines = [
        "✅ <b>Key generated for @" + esc(username) + "</b>",
        "",
        data.message ? "ℹ️ " + esc(data.message) : null,
        key ? "🗝 <b>Key:</b> <code>" + esc(key) + "</code>" : null,
        "⏱ <b>Duration:</b> Each key is valid for <b>2 hours</b>.",
        "",
        "🔗 <b>Tap one of the buttons below to activate your key:</b>"
      ].filter(Boolean);

      const buttons = [];
      if (link4m) buttons.push([{ text: "🔗 Link4m", url: link4m }]);
      if (workink) buttons.push([{ text: "💼 Work.ink", url: workink }]);

      try {
        await bot.editMessageText(lines.join("\n"), {
          chat_id: chatId,
          message_id: loadingMsg.message_id,
          parse_mode: "HTML",
          reply_markup: { inline_keyboard: buttons }
        });
      } catch(e) {
        log("editMessageText with buttons failed: " + e.message);
        await bot.sendMessage(chatId, lines.join("\n"), {
          parse_mode: "HTML",
          reply_markup: { inline_keyboard: buttons }
        });
      }
      log("/getkey success: link4m=" + link4m + " | workink=" + workink);

    } catch (err) {
      log("/getkey fetch error: " + err.message);
      await safeEdit(
        "❌ <b>Connection error.</b>\nUnable to reach server.\n<code>" + esc(err.message) + "</code>"
      );
    }
  }));

  bot.onText(/\/tutorial/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id, "📖 <b>How To Use Guide</b>\n\n🔗 Click the button below:", {
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: [[{ text: "📖 View Tutorial", url: "https://t.me/c/2770498924/10617" }]] }
    });
  }));

  bot.onText(/\/paymentmethod/, groupOnly((msg) => {
    bot.sendMessage(msg.chat.id,
      "👉 <b>PAYMENT METHODS</b>\n\n☑️ PayPal: contact.wolfmod@gmail.com\n☑️ Binance ID: 1158594960\n☑️ SociaBuzz: <a href=\"https://sociabuzz.com/ldh/tribe\">LINK</a>\n☑️ VCB: 9382382864 | LE DONG HA\n\n☑️ Gửi bằng FRIENDS AND FAMILY OPTION!\n\nDM ⚡️ @wolfmodyt ⚡️ để xác nhận.",
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

  bot.on("message", (msg) => {
    if ((msg.text ?? "").startsWith("/")) return;
    if (!isGroupChat(msg)) {
      bot.sendMessage(msg.chat.id,
        "🚫 <b>This bot only works in group chats.</b>\n\nPlease add me to a group or supergroup to use my commands.",
        { parse_mode: "HTML" }
      );
    }
  });

  bot.on("polling_error", (err) => {
    if (err.code === "ETELEGRAM" && err.message.includes("409")) {
      log("409 conflict. Waiting 15s...");
      bot.stopPolling();
      setTimeout(() => { log("Restarting..."); bot.startPolling(); }, 15000);
    } else {
      log("Polling error: " + err.message);
    }
  });

  log("✅ WolfMod Bot started (group-only + /getkey v3 with HTML escape)");
}

startBot();
