const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../app");

let server;
let baseUrl;

before(async () => {
  server = createApp();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
});

test("GET /health returns ok", async () => {
  const res = await fetch(`${baseUrl}/health`);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.status, "ok");
  assert.ok(typeof body.uptime === "number");
});

test("GET /hello returns greeting", async () => {
  const res = await fetch(`${baseUrl}/hello`);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.message, "Hello, World!");
});

test("unknown route returns 404", async () => {
  const res = await fetch(`${baseUrl}/does-not-exist`);
  const body = await res.json();

  assert.equal(res.status, 404);
  assert.equal(body.error, "Not Found");
});
