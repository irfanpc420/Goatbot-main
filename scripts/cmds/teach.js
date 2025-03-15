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
        const ask = encodeURIComponent(content[0]);
        const ans = encodeURIComponent(content[1]);

        // যদি প্রশ্ন ও উত্তর সঠিকভাবে না দেওয়া হয়
        if (!args[0] || !args[1]) {
            return api.sendMessage("Use .teach your ask | Sammy respond", tid, mid);
        }

        try {
            // API কল পাঠানো (আপনার API URL এখানে দেওয়া হলো)
            const res = await axios.post('https://my-api-simma-1.onrender.com/api/teach', {
                question: ask,
                answer: ans
            });

            // API থেকে রেসপন্স মেসেজ নেওয়া
            const responseMessage = res.data.message || "Failed to save your data. Please try again later.";
            api.sendMessage(responseMessage, tid, mid);
        } catch (err) {
            console.error("Error while calling API: ", err);  // এখানে ত্রুটি লগ করুন
            api.sendMessage("An error occurred while saving your data. Please try again later.", tid, mid);
        }
    }
};
