
const mongoose = require("mongoose");
const Product = require("../models/Product");
const config = require("config");

const sampleProducts = [
  {
    name: "Be Healing Tea - Large Pack",
    price: "43",
    department: "Tea",
    description: "Be Healing Tea with vitamins and micro elements, which supports your diet. Contains 50 tea bags.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Green"
  },
  {
    name: "Be Healing Tea - Small Pack",
    price: "27",
    department: "Tea",
    description: "Be Healing Tea with vitamins and micro elements, which supports your diet. Contains 25 tea bags.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Green"
  },
  {
    name: "Organic Green Tea",
    price: "15",
    department: "Tea",
    description: "Premium organic green tea with natural antioxidants.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Green"
  },
  {
    name: "Herbal Detox Blend",
    price: "22",
    department: "Tea",
    description: "Natural herbal blend for detoxification and wellness.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Brown"
  },
  {
    name: "Vitamin A Supplement",
    price: "18",
    department: "Supplements",
    description: "High-quality Vitamin A supplement for daily nutrition.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Orange"
  },
  {
    name: "Vitamin B Complex",
    price: "25",
    department: "Supplements",
    description: "Complete Vitamin B complex for energy and metabolism.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Yellow"
  },
  {
    name: "Vitamin C Boost",
    price: "20",
    department: "Supplements",
    description: "Powerful Vitamin C supplement for immune support.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Orange"
  },
  {
    name: "Vitamin D3",
    price: "19",
    department: "Supplements",
    description: "Essential Vitamin D3 for bone health and immunity.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "White"
  },
  {
    name: "Vitamin K Supplement",
    price: "21",
    department: "Supplements",
    description: "Vitamin K for blood clotting and bone health.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Green"
  },
  {
    name: "Diet Plan - Beginner",
    price: "50",
    department: "Plans",
    description: "Comprehensive 30-day diet plan for beginners.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Blue"
  },
  {
    name: "Diet Plan - Advanced",
    price: "75",
    department: "Plans",
    description: "Advanced 60-day diet plan with meal prep guide.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Blue"
  },
  {
    name: "Nutrition Consultation",
    price: "100",
    department: "Services",
    description: "One-on-one consultation with certified nutritionist.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Purple"
  },
  {
    name: "Meal Prep Guide",
    price: "35",
    department: "Plans",
    description: "Complete meal prep guide with recipes and shopping lists.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Green"
  },
  {
    name: "Wellness Bundle",
    price: "120",
    department: "Bundles",
    description: "Complete wellness bundle including tea, supplements, and diet plan.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Multi"
  },
  {
    name: "Starter Kit",
    price: "65",
    department: "Bundles",
    description: "Perfect starter kit with tea and basic supplements.",
    image: "/images/imgi_5_home_dietitian_about_product_2.png",
    color: "Multi"
  }
];

async function seedProducts() {
  try {
    const connectionString = config.get("db");
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");


    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully inserted ${result.length} products!`);

    const teaCount = await Product.countDocuments({ department: "Tea" });
    const supplementCount = await Product.countDocuments({ department: "Supplements" });
    const planCount = await Product.countDocuments({ department: "Plans" });
    
    console.log("\n📊 Product Summary:");
    console.log(`   Tea: ${teaCount} products`);
    console.log(`   Supplements: ${supplementCount} products`);
    console.log(`   Plans: ${planCount} products`);
    console.log(`   Total: ${await Product.countDocuments()} products`);

    await mongoose.connection.close();
    console.log("\n✅ Done! You can now view products at http://localhost:4000/products");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts();

