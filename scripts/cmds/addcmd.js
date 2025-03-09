const axios = require('axios');

module.exports = {
    config: {
        name: "addcmd",
        version: "1.1",
        author: "Irfan420x",
        countDown: 5,
        role: 2,
        shortDescription: {
            en: "Add a new command to GitHub repository"
        },
        category: "admin",
        guide: "{prefix}addcmd <command_name> <code>"
    },

    onStart: async function ({ event, args, api }) {
        const GITHUB_TOKEN = "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"; // নতুন API টোকেন
        const REPO_OWNER = "irfanpc420"; 
        const REPO_NAME = "Goatbot-main"; 
        const COMMANDS_PATH = "scripts/cmds/"; // তোমার কমান্ড ফোল্ডারের পাথ

        if (args.length < 2) {
            return api.sendMessage("❌ Usage: .addcmd <command_name> <code>", event.threadID, event.messageID);
        }

        const commandName = args[0]; // ফাইলের নাম
        const commandCode = args.slice(1).join(" "); // কোড

        const filePath = `${COMMANDS_PATH}${commandName}.js`; // নতুন কমান্ডের পাথ
        const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

        try {
            // ফাইল আগে থেকে আছে কিনা চেক করা
            const { data } = await axios.get(githubApiUrl, {
                headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
            });

            // ফাইল থাকলে আপডেট করা
            const updateData = {
                message: `Updated ${commandName}.js via bot`,
                content: Buffer.from(commandCode).toString("base64"),
                sha: data.sha, // আগের ফাইলের SHA দরকার আপডেট করতে
            };

            await axios.put(githubApiUrl, updateData, {
                headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
            });

            api.sendMessage(`✅ Command '${commandName}' updated successfully on GitHub!`, event.threadID);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // ফাইল না থাকলে নতুন ফাইল তৈরি করা
                const createData = {
                    message: `Added ${commandName}.js via bot`,
                    content: Buffer.from(commandCode).toString("base64"),
                };

                await axios.put(githubApiUrl, createData, {
                    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
                });

                api.sendMessage(`✅ Command '${commandName}' added successfully on GitHub!`, event.threadID);
            } else {
                console.error(error.response?.data || error.message);
                api.sendMessage(`❌ Error: ${error.response?.data?.message || error.message}`, event.threadID);
            }
        }
    }
};
