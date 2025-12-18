var express = require("express");
var router = express.Router();
var Product = require("../models/Product");
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/uploaded"); // Save uploaded images here
  },
  filename: function (req, file, cb) {
    // Create unique filename: timestamp + original name
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

router.get("/", async function (req, res, next) {
  try {
    const totalProducts = await Product.countDocuments();

    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 }
        }
      }
    ]);

    res.render("admin/dashboard", {
      layout: "admin-layout",
      pagetitle: "Admin Dashboard",
      pageTitle: "Dashboard",
      currentPage: "dashboard",
      totalProducts: totalProducts,
      productsByCategory: productsByCategory
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).send("Error loading dashboard");
  }
});

router.get("/products", async function (req, res, next) {
  try {
    const products = await Product.find().sort({ name: 1 });

    res.render("admin/products/list", {
      layout: "admin-layout",
      pagetitle: "Products - Admin",
      pageTitle: "All Products",
      currentPage: "products",
      products: products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error loading products");
  }
});

router.get("/products/create", function (req, res, next) {
  res.render("admin/products/create", {
    layout: "admin-layout",
    pagetitle: "Add Product - Admin",
    pageTitle: "Add New Product",
    currentPage: "create"
  });
});

router.post("/products/create", upload.single("image"), async function (req, res, next) {
  try {
    const { name, price, color, department, description } = req.body;
    
    const image = req.file ? "/images/uploaded/" + req.file.filename : "";

    const newProduct = new Product({
      name: name,
      price: price,
      color: color || "",
      department: department || "",
      description: description || "",
      image: image
    });

    await newProduct.save();

    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Error creating product: " + error.message);
  }
});

router.get("/products/edit/:id", async function (req, res, next) {
  try {
    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("admin/products/edit", {
      layout: "admin-layout",
      pagetitle: "Edit Product - Admin",
      pageTitle: "Edit Product",
      currentPage: "products",
      product: product
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Error loading product");
  }
});


router.post("/products/edit/:id", upload.single("image"), async function (req, res, next) {
  try {
    // Get data from form
    const { name, price, color, department, description } = req.body;
    
    // Prepare update data
    const updateData = {
      name: name,
      price: price,
      color: color || "",
      department: department || "",
      description: description || ""
    };

    // If new image was uploaded, add it to update data
    if (req.file) {
      updateData.image = "/images/uploaded/" + req.file.filename;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);

    
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product: " + error.message);
  }
});

router.get("/products/delete/:id", async function (req, res, next) {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Error deleting product: " + error.message);
  }
});

module.exports = router;
