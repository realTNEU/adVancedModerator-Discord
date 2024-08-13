require("colors");
module.exports = (client) => {
  console.log(`[INFO] Logged in as ${client.user.username}`.green);
};
