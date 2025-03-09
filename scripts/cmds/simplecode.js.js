module.exports = {
 config: {
 name: "simplecmd",
 version: "1.0",
 author: "Irfan420x",
 countDown: 5,
 role: 2,
 shortDescription: {
 en: "This is a simple test command"
 },
 category: "admin",
 guide: "{prefix}simplecmd"
 },

 onStart: function ({ event, api }) {
 api.sendMessage("✅ Command 'simplecmd' executed successfully!", event.threadID);
 }
};