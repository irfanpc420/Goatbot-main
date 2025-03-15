const axios = require("axios");

module.exports = {
    config: {
        name: "teach",
        aliases: ["simteach"],
        version: "1.0",
        author: "KENLIEPLAYS",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "teach sammy"
        },
        longDescription: {
            en: "teach sammy"
        },
        category: "teach",
        guide: {
            en: "{p}teach your ask | my answer"
        }
    },
    onStart: async function ({ api, event, args }) {
        const { messageID, threadID, senderID, body } = event;
        const tid = threadID,
            mid = messageID;
        const content = args.join(" ").split("|").map(item => item.trim());
        const ask = content[0]; // প্রশ্ন
        const ans = content[1]; // উত্তর

        // যদি প্রশ্ন বা উত্তর না দেওয়া হয়
        if (!ask || !ans) {
            return api.sendMessage("Use .teach your ask | Sammy respond", tid, mid);
        }

        try {
            // আপনার API URL (সিম্পল সেভ ফাংশন API)
            const res = await axios.post('https://my-api-simma-1.onrender.com/api/teach', {
                question: ask,
                answer: ans
            });

            // API থেকে রেসপন্স
            const responseMessage = res.data.message || "Failed to save your data. Please try again later.";
            api.sendMessage(responseMessage, tid, mid);
        } catch (err) {
            console.error("Error while calling API: ", err);
            api.sendMessage("An error occurred while saving your data. Please try again later.", tid, mid);
        }
    }
};
