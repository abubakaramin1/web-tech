const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/contact-us", (req, res) => {
  res.render("contact");
});

app.get("/about", (req, res) => {
  res.render("semester project/about");
});

app.get("/packages", (req, res) => {
  res.render("semester project/packages");
});

app.get("/index", (req, res) => {
  res.render("semester project/index");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});