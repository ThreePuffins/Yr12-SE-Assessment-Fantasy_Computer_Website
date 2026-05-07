const express = require("express");
const cors = require("cors");
const path = require("path");
const ejs = require('ejs');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const database = require("./database.js");

const app = express();
const PORT = 8080;

app.use(
    cors({
        origin: ["http://localhost:8080"],
    })
)
app.use(express.static('public'));
// TODO: make this safer
const COOKIE_SECRET = "YGU&(01y83r8yhas9G(uf01hOISHfu913h";
app.use(cookieParser(COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'signup.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
})

app.get('/u/:id', (req, res) => {
  const id = req.params.id

  database.get_user_by_id(id, (err, rows) => {
    if (err) { console.log(err); }
    else if (rows) {
      const cookie_id = req.cookies.user_id;

      if (id == cookie_id) {
        const data = {
          username: rows.username,
          password: rows.password,
          email: rows.email
        }
        if (data.username) res.render('user', data);
      }
      else {
        const data = {
          username: rows.username
        }
        res.render('view_user', data)
      }
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
      if (data.name) res.render('game_page', data);
    }
    else res.render('fuck');
  })
});

app.post("/sign_up_process", (req, res) => {
  hashed = crypto.createHash('sha256').update(req.body.psw).digest('base64');
  hashed2 = crypto.createHash('sha256').update(req.body.psw2).digest('base64');
  database.create_user(req.body.username, req.body.email, hashed);
  console.log("after created user");

  res.redirect("/login");
});

app.post("/log_in_process", (req, res) => {
  database.get_user_by_username(req.body.username, (err, rows) => {
    if (err) { console.log(err); }
    else if (rows) {
      hashed = crypto.createHash('sha256').update(req.body.psw).digest('base64');
      if (hashed = rows.password) {
        res.cookie('user_id', rows.id, {
          maxAge: 60 * 60 * 1000, // 1 hour
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });
        res.redirect(`/u/${rows.id}`);
      }
    }
    else res.render('fuck');
  })
});


app.post("/api/hello", (req, res) => {
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