module.exports.config = {
 name: 'adminonly',
 version: '1.0.0',
 credits: 'bry',
 role: 0,
 aliases: ['adminmode'],
 cooldown: 5,
 hasPrefix: false,
 usage: "[on/off]"
};

let adminOnlyMode = false;

module.exports.run = async function({ api, event, args }) {
 const allowedUID = "61578130127315";
 
 if (event.senderID !== allowedUID) {
 return api.sendMessage("❌ Owner only command.", event.threadID, event.messageID);
 }

 const action = args[0]?.toLowerCase();

 if (action === 'on') {
 adminOnlyMode = true;
 return api.sendMessage("✅ Admin-only mode activated. Only you can use bot commands now.", event.threadID, event.messageID);
 } 
 else if (action === 'off') {
 adminOnlyMode = false;
 return api.sendMessage("✅ Admin-only mode deactivated. All users can use bot commands now.", event.threadID, event.messageID);
 }
 else {
 return api.sendMessage(
 `🛡️ Admin-Only Mode: ${adminOnlyMode ? 'ACTIVE' : 'INACTIVE'}\n\nUsage:\n• adminonly on - Activate (only owner can use bot)\n• adminonly off - Deactivate (all users can use bot)`,
 event.threadID,
 event.messageID
 );
 }
};

module.exports.handleEvent = async function({ api, event, client }) {
 if (!adminOnlyMode) return;
 
 const allowedUID = "61578130127315";
 const command = event.body?.toLowerCase();
 
 if (command && (command.startsWith('!') || command.startsWith('/') || command.startsWith(client.config.prefix))) {
 if (event.senderID !== allowedUID) {
 api.sendMessage("❌ Bot is in admin-only mode. Only the owner can use commands right now.", event.threadID, event.messageID);
 return true;
 }
 }
};

module.exports.getAdminOnlyMode = function() {
 return adminOnlyMode;
};
