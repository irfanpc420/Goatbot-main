const axios = require("axios");

module.exports = {
  config: {
    name: "isha",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: "AI Response",
    category: "chat",
    guide: {
      en: "{p}{n} isha [message]",
    },
  },

  onStart: async function () {},

  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();

    // Check if the message starts with "Isha"
    if (body.startsWith("isha")) {
      const query = body.slice(4).trim(); // Remove "Isha" from the message to get the query

      if (!query) {
        return api.sendMessage(
          "কিছু জানার থাকলে বলো বেবি 💋",
          event.threadID,
          event.messageID
        );
      }

      try {
        // Make API call with the query
        const response = await axios.get(
          `https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(query)}&uid=1&webSearch=off`
        );
        const content = response.data.response;

        // Send the AI response
        return api.sendMessage(content, event.threadID, event.messageID);
      } catch (error) {
        console.error(`Failed to get an answer: ${error.message}`);
        return api.sendMessage(
          "**An error occurred while processing your request.**",
          event.threadID,
          event.messageID
        );
      }
    }
  },
};
