const axios = require("axios");

module.exports = {
    config: {
        name: "irfan",
        aliases: [],
        version: "1.0",
        author: "KENLIEPLAYS",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "Fetch response from API"
        },
        longDescription: {
            en: "Fetch response based on stored data from the Sim API"
        },
        category: "teach",
        guide: {
            en: "{p}irfan <message>"
        }
    },
    onStart: async function ({ api, event, args }) {
        const { messageID, threadID, senderID, body } = event;
        const tid = threadID,
            mid = messageID;
        const message = args.join(" ").toLowerCase();  // message থেকে স্পেস গুলি সরানো হয়েছে।

        if (!message) return api.sendMessage("Please provide a question after /irfan", tid, mid);

        try {
            // API থেকে রেসপন্স নেয়া
            const res = await axios.get(`https://my-api-simma-1.onrender.com/api/chatbot?message=${encodeURIComponent(message)}`);

            // রেসপন্স মেসেজ পাওয়া না গেলে ডিফল্ট উত্তর পাঠানো
            const replyMessage = res.data.reply || "I don't know the answer yet!";
            api.sendMessage(replyMessage, tid, mid);
        } catch (err) {
            console.error("Error while fetching data: ", err);
            api.sendMessage("An error occurred while fetching the response. Please try again later.", tid, mid);
        }
    }
};
