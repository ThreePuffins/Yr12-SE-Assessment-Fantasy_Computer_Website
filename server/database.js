const sqlite = require('sqlite3')
const db = new sqlite.Database(":memory:")

db.serialize(() => {
    const query = 'CREATE TABLE games (id int, name string, release_day int, release_month int, release_year int)';
    db.run(query);
    const stmt = db.prepare('INSERT INTO games (id, name, release_day, release_month, release_year) VALUES (?, ?, ?, ?, ?)');

    for (let i = 0; i < 10; i++) {
        stmt.run([i, `Ipsum${i}`, i, i, i]);
    }

    stmt.finalize();
})


function get(cb) {
    db.all("SELECT * FROM games", (err, rows) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, rows);
    });
}
module.exports = { get };