const { createApp } = require("./app");

const HOSTNAME = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

const server = createApp();

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
