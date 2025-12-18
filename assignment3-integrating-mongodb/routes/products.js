var express = require("express");
var router = express.Router();
var Product = require("../models/Product");

router.get("/", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const category = req.query.category || "";
    const minPrice = parseFloat(req.query.minPrice) || 0; 
    const maxPrice = parseFloat(req.query.maxPrice) || 999999; 

    const skip = (page - 1) * limit;

    let filter = {};
    
    if (category && category !== "all") {
      filter.department = category;
    }

    let products = await Product.find(filter)
      .sort({ name: 1 });  

    if (minPrice > 0 || maxPrice < 999999) {
      products = products.filter(product => {
        const productPrice = parseFloat(product.price) || 0;
        return productPrice >= minPrice && productPrice <= maxPrice;
      });
    }

    const totalProducts = products.length;
    
    const totalPages = Math.ceil(totalProducts / limit);

    products = products.slice(skip, skip + limit);

    const categories = await Product.distinct("department");

    res.render("ecommerce/products", {
      layout: "ecommerce-layout",
      pagetitle: "Products - BeDietitian",
      products: products,
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts,
      limit: limit,
      categories: categories,
      selectedCategory: category,
      minPrice: minPrice,
      maxPrice: maxPrice
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error loading products");
  }
});

module.exports = router;

