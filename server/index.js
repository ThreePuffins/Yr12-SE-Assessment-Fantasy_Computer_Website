const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5500;

app.use(
    cors({
        origin: ["http://127.0.0.1"],
    })
)

app.get("/", (req, res) => {
    res.send("hi");
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "hi from a pea-eye"});
});

app.listen(PORT, () => {
    console.log(`hee-ho check out http://127.0.0.1:${PORT}`);
});