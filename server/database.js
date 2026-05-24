const sqlite = require('sqlite3')
const db = new sqlite.Database(":memory:")

db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON;");

    const init_users = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT,'
        + 'password TEXT, games TEXT)';
    db.run(init_users);

    const init_game = 'CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY, name TEXT, cover_image TEXT, '
        + 'game_file TEXT, user INT, description TEXT, FOREIGN KEY(user) REFERENCES users(id) ON DELETE CASCADE)';
    db.run(init_game);

    create_user("random_guy", "email", "password");

    // Fills games with placeholders for display purposes
    for (let i = 0; i < 10; i++) {
        create_game(`Ipsum${i}`, `/games/covers/default.png`, "1", "Lorem ipsum dolores smth smth Lorem ipsum dolores smth smth Lorem ipsum dolores smth smth decription decription decription decription", (err, id) => {});
    }
});

function create_game(name, cover_image, user, description, cb){
    const sql = 'INSERT INTO games (name, cover_image, user, description) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, cover_image, user, description], function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        db.run('UPDATE games SET game_file=(?) WHERE id=(?)', ["/games/code/" + this.lastID + ".js", this.lastID]);
        cb(null, this.lastID);
    });
};

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
    const stmt = db.prepare("INSERT INTO users (username, email, password, games) VALUES (?, ?, ?, '{}')");
    stmt.all([username, email, password]);
}

function delete_user(id) {
    const stmt = db.prepare("DELETE from users WHERE id = (?)");
    stmt.all([id]);
}

function delete_game(id) {
    const stmt = db.prepare("DELETE from games WHERE id = (?)");
    stmt.all([id]);
}

function edit_user(id, username, email, password, games) {
    const stmt = db.prepare("UPDATE users SET username=(?), email=(?), password=(?), games=(?) WHERE id = (?)");
    stmt.all([username, email, password, id, games]);
}

function edit_game(id, name, cover_image, description) {
    const stmt = db.prepare("UPDATE games SET name=(?), cover_image=(?), description=(?) WHERE id = (?)");
    stmt.all([name, cover_image, description, id]);
}
module.exports = {delete_game, edit_game, get_game, get_user_by_id, 
    create_user, get_user_by_username, get_games, delete_user, edit_user, create_game};