var express = require("express");
var router = express.Router();
var Product = require("../models/Product");
const Category = require("../models/Category");
const { checkCartNotEmpty } = require("../middlewares/shopMiddleware");
const Order = require("../models/Order");

// Cart view
router.get("/cart", async function (req, res, next) {
  let cart = req.session.cart;
  if (!cart) cart = [];

  // Find products in cart
  let products = await Product.find({ _id: { $in: cart } });

  // Task 4: Recalculate cart total on the server for security
  let total = products.reduce(
    (total, product) => total + Number(product.price),
    0
  );

  res.render("site/cart", { products, total });
});

// Add to cart logic
router.get("/add-cart/:id", function (req, res, next) {
  let cart = req.session.cart;
  if (!cart) cart = [];

  // Task 4: Prevent duplicate products in cart
  if (!cart.includes(req.params.id)) {
    cart.push(req.params.id);
  }

  req.session.cart = cart;
  req.flash("success", "Product Added To Cart");
  // Redirect to the cart page so the user can see their added item
  res.redirect("/cart");
});

// Checkout page
router.get("/checkout", checkCartNotEmpty, async function (req, res, next) {
  let cart = req.session.cart;
  let products = await Product.find({ _id: { $in: cart } });
  let total = products.reduce((total, p) => total + Number(p.price), 0);

  res.render("site/checkout", { products, total });
});

router.post("/checkout", checkCartNotEmpty, async function (req, res, next) {
  try {
    const { customerName, email } = req.body;

    if (!customerName || !email) {
      req.flash("danger", "Please provide name and email.");
      return res.redirect("/checkout");
    }

    let cart = req.session.cart;
    let products = await Product.find({ _id: { $in: cart } });

    let totalAmount = 0;
    let items = products.map(p => {
      totalAmount += p.price;
      return {
        product: p._id,
        price: p.price,
        quantity: 1
      };
    });

    // Create order object using the Mongoose model
    const order = new Order({
      customerName,
      email,
      items,
      totalAmount,
      status: "Pending"
    });

    // Save the order to MongoDB
    await order.save();

    req.session.cart = [];

    res.redirect("/order-confirmation/" + order._id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Order confirmation page
router.get("/order-confirmation/:id", async function (req, res, next) {
  let order = await Order.findById(req.params.id).populate("items.product");
  res.render("site/order-confirmation", { order });
});

router.get("/:page?", async function (req, res, next) {
  let page = Number(req.params.page);
  let pageSize = 10;
  let skip = (page - 1) * pageSize;
  if (!page) page = 1;
  if (!skip) skip = 0;

  // return res.send({ page, pageSize, skip });
  let products = await Product.find().skip(skip).limit(pageSize);
  let totalProducts = await Product.countDocuments();
  let totalPages = Math.ceil(totalProducts / pageSize);
  return res.render("site/homepage", {
    pagetitle: "Awesome Products",
    products,
    page,
    pageSize,
    totalPages,
  });
});

router.get("/:Catagorys?", async function (req, res, next) {
  let catagories = await Category;
  let Categorys = [shirt, pant, beg, trousels, dresses];

  return res.render("site/collections/Catetorys", {
    Category_title: "All Catagories",
    catagories,
    Categorys,

  });
});

module.exports = router;
