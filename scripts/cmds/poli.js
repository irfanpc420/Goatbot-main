const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "poli",
    credits: "Loid Butter",
    category: "ai"
  },

  onStart: async function({ api, event, args }) {
    let { threadID, messageID } = event;
    let query = args.join(" ");
    if (!query) return api.sendMessage("⚠️ Please provide a text/query!", threadID, messageID);

    // প্রথমে ইউজারকে জানানো হবে যে ইমেজ জেনারেট করা হচ্ছে
    api.sendMessage("⏳ Generating image, please wait...", threadID, async (err, info) => {
      if (err) return console.error(err);

      let path = __dirname + `/cache/poli_${Date.now()}.png`;

      try {
        const response = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(query)}`, {
          responseType: "arraybuffer",
        });

        fs.writeFileSync(path, Buffer.from(response.data, "binary"));

        api.sendMessage({
          body: "✅ Here's your generated image!",
          attachment: fs.createReadStream(path)
        }, threadID, () => {
          fs.unlinkSync(path); // ইমেজ পাঠানোর পর ফাইল ডিলিট করে দেওয়া হবে
        }, messageID);

      } catch (error) {
        console.error(error);
        api.sendMessage("❌ Failed to generate image. Please try again later.", threadID, messageID);
      }
    });
  }
};
