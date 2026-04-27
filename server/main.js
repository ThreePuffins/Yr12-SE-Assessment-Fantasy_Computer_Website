const express = require("express");
const cors = require("cors");
const path = require("path");
const ejs = require('ejs');

const database = require("./database.js")

const app = express();
const PORT = 5500;

app.use(
    cors({
        origin: ["http://localhost:5501"],
    })
)

app.use(express.static('client'))

app.set('view engine', 'ejs');

app.set('views', './views');


app.get('/g/:g', (req, res) => {
  const data = {
    title: req.params.g
  };


  database.get((err, rows) => {
      if (err) {console.log(err);}
      else { console.log(rows) }
  })

  res.render('index', data);
});


app.get("/api/hello", (req, res) => {
  res.json({message: "hello beijing wasgud"});
});

app.listen(PORT, () => {
    console.log(`hee-ho check out http://localhost:${PORT}`);
    console.log();
    //res.json(database.get()[0].name);
});