const sqlite = require('sqlite3')
const db = new sqlite.Database(":memory:")

db.serialize(() => {
    const init_gay = 'CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY, name TEXT, cover_image TEXT, game_file TEXT)';
    db.run(init_gay);
    const init_ceridwen = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)';
    db.run(init_ceridwen);


    const fill_gay = db.prepare('INSERT INTO games (id, name, cover_image, game_file) VALUES (?, ?, ?, ?)');
    
    for (let i = 0; i < 10; i++) {
        fill_gay.run([i, `Ipsum${i}`, `games/covers/image.jpeg`, `games/code/i.txt`]);
    }
    
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

function get_games(cb) {
    const stmt = db.prepare("SELECT * FROM games");
    stmt.all((err, rows) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, rows);
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
    return;
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

function delete_user(id) {
    const stmt = db.prepare("DELETE from users WHERE id = (?)");
    stmt.all(id)
}

function edit_user(id, username, email, password) {
    const stmt = db.prepare("UPDATE users SET username=(?), email=(?), password=(?) WHERE id = (?)");
    stmt.all([username, email, password, id]);
}
module.exports = { get_game, get_user_by_id, create_user, get_user_by_username, get_games, delete_user, edit_user};