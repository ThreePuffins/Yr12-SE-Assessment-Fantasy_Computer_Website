const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5500;

app.use(
    cors({
        origin: ["http://localhost:5501"],
    })
)

app.get("/", (req, res) => {
    res.sendFile("/client/homepage.html");
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "hi from a pea-eye"});
});

app.listen(PORT, () => {
    console.log(`hee-ho check out http://localhost:${PORT}`);
});