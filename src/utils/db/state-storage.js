const db = require("./");

const create = "CREATE TABLE IF NOT EXISTS migrations (id integer PRIMARY KEY, data jsonb NOT NULL)";

const postgresStateStorage = {
    async load(fn) {
        await db.connect();
        await db.query(create);
        const { rows } = await db.query("SELECT data FROM migrations");
        if (rows.length !== 1) {
            console.log("No migrations found in database.");
            return fn(null, {});
        }
        fn(null, rows[0].data);
    },

    async save({ lastRun, migrations }, fn) {
        await db.connect();
        await db.query(create);
        await db.query(`
            INSERT INTO migrations (id, data) 
            VALUES (1, $1)
            ON CONFLICT (id) DO UPDATE SET data = $1`,
            [{ lastRun, migrations }]);
        fn();
    },
};

module.exports = Object.assign(() => {
    return postgresStateStorage;
}, postgresStateStorage);
