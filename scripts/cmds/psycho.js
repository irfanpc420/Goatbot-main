const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "psycho",
    aliases: ["ps"],
    version: "1.1",
    author: "vex_Kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "Generate images using GenZ API",
    longDescription: "Generates images based on the provided prompt using the GenZ API",
    category: "image",
    guide: {
      en: "{p}psycho [prompt]"
    }
  },
  onStart: async function ({ message, event, args, api }) {
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);
    try {
      const prompt = args.join(" ").trim();
      
      if (!prompt) {
        return message.reply("❌ | Please provide a prompt.");
      }

      // Notify the user that image generation is in progress
      message.reply("🔄 | Generating image... Please wait.");

      const apiResponse = await axios.get(`https://dall-e-tau-steel.vercel.app/kshitiz?prompt=${encodeURIComponent(prompt)}`);
      const imageUrl = apiResponse.data.response;

      if (imageUrl) {
        const imagePath = path.join(__dirname, "cache", `${Date.now()}_generated_image.png`);
        const imageResponse = await axios.get(imageUrl, { responseType: "stream" });
        const imageStream = imageResponse.data.pipe(fs.createWriteStream(imagePath));

        imageStream.on("finish", () => {
          const stream = fs.createReadStream(imagePath);
          message.reply({
            body: "Here is your generated image! 🎨",
            attachment: stream
          });
        });
      } else {
        throw new Error("Image URL not found in response");
      }
    } catch (error) {
      console.error("Error:", error);
      message.reply("❌ | An error occurred. Please try again later.");
    }
  }
};
