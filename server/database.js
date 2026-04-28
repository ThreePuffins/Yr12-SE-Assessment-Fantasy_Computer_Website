const sqlite = require('sqlite3')
const db = new sqlite.Database(":memory:")

db.serialize(() => {
    const init_gay = 'CREATE TABLE IF NOT EXISTS games (id int, name string, release_day int, release_month int, release_year int)';
    db.run(init_gay);
    const init_ceridwen = 'CREATE TABLE IF NOT EXISTS users (id int, username string, email string, password string)';
    db.run(init_ceridwen);


    const fill_user = db.prepare('INSERT INTO games (id, name, release_day, release_month, release_year) VALUES (?, ?, ?, ?, ?)');
    
    for (let i = 0; i < 10; i++) {
        fill_user.run([i, `Ipsum${i}`, i, i, i]);
    }

    const fill_gay = db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
    
    for (let i = 0; i < 17; i++) {
        fill_gay.run([i, `Ceridwen${i}`, "mq02v82bkxh2b73v"]);
    }

    fill_gay.finalize();
    fill_user.finalize();
})

function get_game(id, cb) {
    const stmt = db.prepare("SELECT * FROM games WHERE id = (?)");
    stmt.all(id, (err, rows) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, rows[0]);
    })
}

function get_user(id, cb) {
    const stmt = db.prepare("SELECT * FROM users WHERE id = (?)");
    stmt.all(id, (err, rows) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, rows[0]);
    })
}

function create_user(id, username, email, password) {
    const stmt = db.prepare("INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)");
    stmt.all([id, username, email, password])
}
module.exports = { get_game, get_user};