const http = require("node:http");

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

const routes = {
  "GET /": (req, res) => {
    sendJson(res, 200, { message: "Welcome to the demo app" });
  },

  "GET /health": (req, res) => {
    sendJson(res, 200, {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  },

  "GET /hello": (req, res) => {
    sendJson(res, 200, { message: "Hello, World!" });
  },

  "GET /time": (req, res) => {
    sendJson(res, 200, { time: new Date().toISOString() });
  },
};

function handleRequest(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  const handler = routes[`${req.method} ${pathname}`];

  console.log(`${req.method} ${pathname}`);

  if (!handler) {
    return sendJson(res, 404, { error: "Not Found" });
  }

  handler(req, res);
}

function createApp() {
  return http.createServer(handleRequest);
}

module.exports = { createApp };
