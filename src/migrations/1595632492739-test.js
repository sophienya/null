const db = require("../utils/db");

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE "public"."Template" (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    event TEXT NOT NULL,
    template TEXT NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT false
  );
  CREATE TABLE "public"."Variable" (
    key TEXT PRIMARY KEY NOT NULL,
    value JSONB
  );
  `);
  client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE "Variable";
  DROP TABLE "Template";
  `);
  client.release(true);
  next()
}
