const express = require("express");
const cors = require("cors");
const path = require("path");
const ejs = require('ejs');



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

  res.render('index', data);
});


app.get("/api/hello", (req, res) => {
    res.json({ message: "hi from a pea-eye"});
});

app.listen(PORT, () => {
    console.log(`hee-ho check out http://localhost:${PORT}`);
});