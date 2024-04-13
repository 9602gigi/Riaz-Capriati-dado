let path = __dirname + "/cache/spotify.mp3";
const axios = require("axios");
const fs = require("fs");

module.exports.config = {
		name: "spt",
		version: "1.0.2",
		role: 0,
		credits: "joshua deku",
		description: "Play and Download music from Spotify",
		hasPrefix: false,
		cooldown: 5,
		aliases: ["spt"]
};

module.exports.run = async function ({ api, event, args }) {
		try {
				const { spotify, spotifydl } = require("betabotz-tools");
				let q = args.join(" ");
				if (!q) return api.sendMessage("⛔| 𝗠𝗶𝘀𝘀𝗶𝗻𝗴 𝘁𝗶𝘁𝗹𝗲 𝗼𝗳 𝘁𝗵𝗲 𝘀𝗼𝗻𝗴", event.threadID, event.messageID);

				api.sendMessage("💭 𝗦𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴 𝗳𝗼𝗿 “" + q + "” 𝗪𝗔𝗜𝗧 ....🎧", event.threadID, async (err, info) => {
						try {
								const r = await axios.get("https://lyrist.vercel.app/api/" + q);
								const { lyrics, title } = r.data;
								const results = await spotify(encodeURI(q));

								let url = results.result.data[0].url;

								const result1 = await spotifydl(url);

								const dl = (
										await axios.get(result1.result, { responseType: "arraybuffer" })
								).data;
								fs.writeFileSync(path, Buffer.from(dl, "utf-8"));
								api.sendMessage(
										{
												body:
														"·▄ █ ▄ ▄  𝗦𝗣𝗢𝗧𝗜𝗙𝗬 𝗗𝗟 ▄ █ ▄ ▄ ·\n\n" + "🎧𝗧𝗶𝘁𝗹𝗲: " + title + "\n 🪄𝗟𝘆𝗿𝗶𝗰𝘀:\n\n" +
														lyrics +
														"\n\n𝗬𝗼𝘂 𝗰𝗮𝗻 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝘁𝗵𝗶𝘀 𝗮𝘂𝗱𝗶𝗼 𝗯𝘆 𝗰𝗹𝗶𝗰𝗸𝗶𝗻𝗴 𝘁𝗵𝗶𝘀 𝗹𝗶𝗻𝗸 𝗼𝗿 𝗽𝗮𝘀𝘁𝗲 𝗶𝘁 𝘁𝗼 𝘆𝗼𝘂𝗿 𝗯𝗿𝗼𝘄𝘀𝗲𝗿: " +
														result1.result,
												attachment: fs.createReadStream(path),
										},
										event.threadID,
										(err, info) => {
												fs.unlinkSync(path);
										}
								);
						} catch (error) {
								console.error(error);
								api.sendMessage("An error occurred while processing your request.", event.threadID);
						}
				});
		} catch (s) {
				api.sendMessage(s.message, event.threadID);
		}
};
