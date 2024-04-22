const fonts = {
    
};

const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: 1.0,
    credits: "aesther", // Api aryan Api
    description: "AI",
    hasPrefix: false,
    usages: "{pn} [prompt]",
    aliases: ["ai2", "bot"],
    cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const prompt = args.join(" ");
        if (!prompt) {
            await api.sendMessage("シƬHƐᗩ©:\n\n☁️ღゝ◡╹)ノ[📑] 𝗛𝗜 !!", event.threadID);
            return;
        }

        const response = await axios.get(`https://arysprak.onrender.com/api/chatgpt?prompt=${encodeURIComponent(prompt)}`);
        const answer = response.data.answer;

        let formattedAnswer = "";
        for (let char of answer) {
            if (fonts[char.toLowerCase()]) {
                formattedAnswer += fonts[char.toLowerCase()];
            } else {
                formattedAnswer += char;
            }
        }

        await api.sendMessage(`シƬHƐᗩ©☁️ღゝ◡╹)ノ[📑]:\n━━━━━━━━━━━━\n${formattedAnswer}\n━━━━━━━━━━━━\n[🛄]🔴🔵⚪`, event.threadID);
    } catch (error) {
        console.error("Error:", error.message);
    }
};
