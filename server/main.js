const express = require("express");
const cors = require("cors");
const path = require("path");
const ejs = require('ejs');

const database = require("./database.js")

const app = express();
const PORT = 8080;

app.use(
    cors({
        origin: ["http://localhost:8080"],
    })
)
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'signup.html'));
})

app.get('/u/:id', (req, res) => {
  const id = req.params.id

  database.get_user(id, (err, rows) => {
    if (err) { console.log(err); }
    else if (rows) {
      const data = {
        username: rows.username,
        password: rows.password
      }
      if (data.username) res.render('user', data);
    }
    else res.render('fuck');
  })
});

app.get('/g/:id', (req, res) => {
  
  const id = req.params.id

  database.get_game(id, (err, rows) => {
    if (err) { console.log(err); }
    else if (rows) {
      const data = {
        name: rows.name
      }
      if (data.name) res.render('game', data);
    }
    else res.render('fuck');
  })
});

app.get("/api/hello", (req, res) => {
  res.json({message: "hello beijing wasgud"});
});

app.use(function(req, res) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404');
    return;
  }

  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }
  
  res.type('txt').send('Not found');
});

app.listen(PORT, () => {
    console.log(`hee-ho check out http://localhost:${PORT}`);
});