var express = require("express");
var router = express.Router();

// Home page
router.get("/", function (req, res, next) {
  res.render("ecommerce/index", {
    layout: "ecommerce-layout",
    pagetitle: "BeDietitian - Home"
  });
});

// About page
router.get("/about", function (req, res, next) {
  res.render("ecommerce/about", {
    layout: "ecommerce-layout",
    pagetitle: "About Dr. Diana Finzley"
  });
});

// Packages page
router.get("/packages", function (req, res, next) {
  res.render("ecommerce/packages", {
    layout: "ecommerce-layout",
    pagetitle: "Packages - BeDietitian"
  });
});

// Contact page
router.get("/contact", function (req, res, next) {
  res.render("ecommerce/contact", {
    layout: "ecommerce-layout",
    pagetitle: "Contact - BeDietitian"
  });
});

// Handle contact form submission
router.post("/contact", function (req, res, next) {
  console.log("Contact form submitted:", req.body);
  res.redirect("/contact?success=true");
});

module.exports = router;

