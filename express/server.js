const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(expressLayouts);

// View engine setup
app.set("view engine", "ejs");
app.set("layout", "layout");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Routes
app.get('/', (req, res) => {
  res.render("index", {});
});

app.get("/about", (req, res) => {
  res.render("about", {});
});

app.get("/packages", (req, res) => {
  res.render("packages", {});
});

app.get("semester project/contact", (req, res) => {
  res.render("contact", {});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});