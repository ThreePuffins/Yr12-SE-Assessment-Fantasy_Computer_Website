const express = require("express");
const cors = require("cors");
const path = require("path");
const ejs = require('ejs');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const database = require("./database.js");

const app = express();
const PORT = 8080;
const jwt_secret = process.env.JWT_SECRET;

app.use(
    cors({
        origin: ["http://localhost:8080"],
    })
)
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

function checkUser(req, res, next) {
  const token = req.cookies.jwt_refresh;

  if (!token) {
    next();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      next();
      return;
    }

    req.user = decoded;
    next();
  });
}

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/', checkUser, (req, res) => {
  res.render('index', {session: req.user})
});

app.get('/about', checkUser, (req, res) => {
  res.render('index', {session: req.user})
});

app.get('/u/:id', checkUser, (req, res) => {
  const id = req.params.id

  database.get_user_by_id(id, (err, rows) => {
    if (err) { console.log(err); }
    else if (rows) {
      if (req.user) {
        if (id == req.user.id) {
          const data = {
            username: rows.username,
            password: rows.password,
            email: rows.email,
            session: req.user
          }
          res.render('user', data);
          return;
        }
      }
      const data = {
        username: rows.username,
        session: req.user
      }
      res.render('view_user', data)
    }
    else res.render('404', {session: req.user});
  })
});

app.get('/g/:id', checkUser, (req, res) => {
  
  const id = req.params.id;

  database.get_game(id, (err, rows) => {
    if (err) { console.log(err); }
    else if (rows) {
      const data = {
        name: rows.name,
        session: req.user
      }
      if (data.name) res.render('game_page', data);
    }
    else res.render('404', {session: req.user});
  })
});

app.get('/games', checkUser, (req, res) => {
  var games_per_page = 8;
  var page = req.query["page"] ? req.query["page"] : 1;

  database.get_games(async (err, rows) => {
    if (err) { console.log(err); }
    else if (rows) {
      const display_games = rows.filter((game) => game.id >= games_per_page * (page - 1) && game.id < games_per_page * (page))
      const data = {
        games: display_games,
        page: page,
        session: req.user
      }
      res.render('games', data);
    }
    else res.render('404', {session: req.user});
  })
});

app.post("/auth/sign_up_process", (req, res) => {
  hashed = crypto.createHash('sha256').update(req.body.psw).digest('base64');
  hashed2 = crypto.createHash('sha256').update(req.body.psw2).digest('base64');
  database.create_user(req.body.username, req.body.email, hashed);

  res.redirect("/");
});

app.post("/auth/log_in_process", (req, res) => {
  database.get_user_by_username(req.body.username, (err, rows) => {
    if (err) { console.log(err); }
    else if (rows) {
      hashed = crypto.createHash('sha256').update(req.body.psw).digest('base64');
      if (hashed = rows.password) {
        const payload = {
          username: rows.username,
          id: rows.id
        };
        const token = jwt.sign(payload, jwt_secret, {
          expiresIn: '7DAYS'
        });
        res.cookie('jwt_refresh', token, {
          maxAge: 60 * 60 * 1000, 
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });
        res.redirect(`/u/${rows.id}`);
      }
    }
    else res.render('404', {session: req.user});
  })
});

app.get("/auth/log_out", checkUser, (req, res) => {
  res.clearCookie("jwt_refresh");
  res.redirect("/");
});

app.use(checkUser, function(req, res) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', {session: req.user});
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