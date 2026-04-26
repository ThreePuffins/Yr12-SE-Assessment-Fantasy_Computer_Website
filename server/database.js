const sqlite = require('sqlite3')
const db = new sqlite.Database(":memory:")

db.serialize(() => {
    const query = 'CREATE TABLE game (name string, release_day int, release_month int, release_year int)'
    db.run(query)
    const stmt = db.prepare('INSERT INTO game (name, release_day, release_month, release_year) VALUES (?, ?, ?, ?)')

    for (let i = 0; i < 10; i++) {
        stmt.run([`Ipsum ${i}`, i, i, i])
    }

    stmt.finalize()

    db.each('SELECT rowid as id, * FROM game', (err, row) => {
        console.log(`${row.id}: ${row.name}, Release Date: ${row.release_day}/${row.release_month}/${row.release_year}`);
    })
})

db.close()