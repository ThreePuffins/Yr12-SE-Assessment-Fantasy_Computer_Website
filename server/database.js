const sqlite = require('sqlite3')
const db = new sqlite.Database(":memory:")

db.serialize(() => {
    const init_gay = 'CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY, name TEXT)';
    db.run(init_gay);
    const init_ceridwen = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username string, email string, password string)';
    db.run(init_ceridwen);


    const fill_gay = db.prepare('INSERT INTO games (id, name) VALUES (?, ?)');
    
    for (let i = 0; i < 10; i++) {
        fill_gay.run([i, `Ipsum${i}`]);
    }

    // const fill_user = db.prepare('INSERT INTO users (id, username, password) VALUES (?, ?, ?)');
    
    // for (let i = 0; i < 17; i++) {
    //     fill_user.run([i, `Ceridwen${i}`, "mq02v82bkxh2b73v"]);
    // }

    // fill_user.finalize();

    fill_gay.finalize();
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

function get_user_by_id(id, cb) {
    const stmt = db.prepare("SELECT * FROM users WHERE id = (?)");
    stmt.all(id, (err, rows) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, rows[0]);
    })
}

function get_user_by_username(username, cb) {
    const stmt = db.prepare("SELECT * FROM users WHERE username = (?)");
    stmt.all(username, (err, rows) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, rows[0]);
    })
}

function create_user(username, email, password) {
    const stmt = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    stmt.all([username, email, password])
}
module.exports = { get_game, get_user_by_id, create_user, get_user_by_username};