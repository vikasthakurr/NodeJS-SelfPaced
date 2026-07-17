import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./model/product.model.js";

dotenv.config();

const products = [
  // Electronics - 8 products
  {
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/1/200/200",
    rating: 4.5,
  },
  {
    name: "Bluetooth Speaker",
    price: 49.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/2/200/200",
    rating: 4.2,
  },
  {
    name: "Mechanical Keyboard",
    price: 129.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/3/200/200",
    rating: 4.7,
  },
  {
    name: "Gaming Mouse",
    price: 59.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/4/200/200",
    rating: 4.3,
  },
  {
    name: "USB-C Hub",
    price: 34.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/5/200/200",
    rating: 3.9,
  },
  {
    name: "Webcam HD",
    price: 89.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/6/200/200",
    rating: 4.1,
  },
  {
    name: "Portable Charger",
    price: 29.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/7/200/200",
    rating: 4.4,
  },
  {
    name: "Smartwatch",
    price: 199.99,
    category: "Electronics",
    image: "https://picsum.photos/seed/8/200/200",
    rating: 4.6,
  },

  // Clothing - 8 products
  {
    name: "Cotton T-Shirt",
    price: 19.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/9/200/200",
    rating: 4.0,
  },
  {
    name: "Denim Jeans",
    price: 49.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/10/200/200",
    rating: 4.3,
  },
  {
    name: "Hoodie",
    price: 39.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/11/200/200",
    rating: 4.5,
  },
  {
    name: "Sneakers",
    price: 89.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/12/200/200",
    rating: 4.6,
  },
  {
    name: "Winter Jacket",
    price: 129.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/13/200/200",
    rating: 4.2,
  },
  {
    name: "Baseball Cap",
    price: 14.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/14/200/200",
    rating: 3.8,
  },
  {
    name: "Sunglasses",
    price: 24.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/15/200/200",
    rating: 4.1,
  },
  {
    name: "Running Shorts",
    price: 29.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/16/200/200",
    rating: 4.0,
  },

  // Books - 7 products
  {
    name: "JavaScript Guide",
    price: 39.99,
    category: "Books",
    image: "https://picsum.photos/seed/17/200/200",
    rating: 4.8,
  },
  {
    name: "Node.js in Action",
    price: 44.99,
    category: "Books",
    image: "https://picsum.photos/seed/18/200/200",
    rating: 4.6,
  },
  {
    name: "Clean Code",
    price: 34.99,
    category: "Books",
    image: "https://picsum.photos/seed/19/200/200",
    rating: 4.9,
  },
  {
    name: "Design Patterns",
    price: 49.99,
    category: "Books",
    image: "https://picsum.photos/seed/20/200/200",
    rating: 4.5,
  },
  {
    name: "Self Help Book",
    price: 19.99,
    category: "Books",
    image: "https://picsum.photos/seed/21/200/200",
    rating: 3.7,
  },
  {
    name: "Cookbook Recipes",
    price: 24.99,
    category: "Books",
    image: "https://picsum.photos/seed/22/200/200",
    rating: 4.2,
  },
  {
    name: "Science Fiction Novel",
    price: 14.99,
    category: "Books",
    image: "https://picsum.photos/seed/23/200/200",
    rating: 4.4,
  },

  // Home & Kitchen - 7 products
  {
    name: "Coffee Maker",
    price: 79.99,
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/24/200/200",
    rating: 4.3,
  },
  {
    name: "Blender",
    price: 59.99,
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/25/200/200",
    rating: 4.1,
  },
  {
    name: "Air Fryer",
    price: 99.99,
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/26/200/200",
    rating: 4.7,
  },
  {
    name: "Toaster",
    price: 29.99,
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/27/200/200",
    rating: 3.9,
  },
  {
    name: "Vacuum Cleaner",
    price: 149.99,
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/28/200/200",
    rating: 4.4,
  },
  {
    name: "Desk Lamp",
    price: 34.99,
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/29/200/200",
    rating: 4.0,
  },
  {
    name: "Pillow Set",
    price: 44.99,
    category: "Home & Kitchen",
    image: "https://picsum.photos/seed/30/200/200",
    rating: 4.2,
  },

  // Sports - 7 products
  {
    name: "Yoga Mat",
    price: 24.99,
    category: "Sports",
    image: "https://picsum.photos/seed/31/200/200",
    rating: 4.5,
  },
  {
    name: "Dumbbells Set",
    price: 69.99,
    category: "Sports",
    image: "https://picsum.photos/seed/32/200/200",
    rating: 4.6,
  },
  {
    name: "Resistance Bands",
    price: 19.99,
    category: "Sports",
    image: "https://picsum.photos/seed/33/200/200",
    rating: 4.3,
  },
  {
    name: "Football",
    price: 29.99,
    category: "Sports",
    image: "https://picsum.photos/seed/34/200/200",
    rating: 4.1,
  },
  {
    name: "Cricket Bat",
    price: 59.99,
    category: "Sports",
    image: "https://picsum.photos/seed/35/200/200",
    rating: 4.4,
  },
  {
    name: "Tennis Racket",
    price: 89.99,
    category: "Sports",
    image: "https://picsum.photos/seed/36/200/200",
    rating: 4.2,
  },
  {
    name: "Running Shoes",
    price: 109.99,
    category: "Sports",
    image: "https://picsum.photos/seed/37/200/200",
    rating: 4.7,
  },

  // Beauty - 6 products
  {
    name: "Face Cream",
    price: 24.99,
    category: "Beauty",
    image: "https://picsum.photos/seed/38/200/200",
    rating: 4.0,
  },
  {
    name: "Shampoo",
    price: 12.99,
    category: "Beauty",
    image: "https://picsum.photos/seed/39/200/200",
    rating: 4.2,
  },
  {
    name: "Perfume",
    price: 59.99,
    category: "Beauty",
    image: "https://picsum.photos/seed/40/200/200",
    rating: 4.5,
  },
  {
    name: "Lipstick",
    price: 14.99,
    category: "Beauty",
    image: "https://picsum.photos/seed/41/200/200",
    rating: 3.9,
  },
  {
    name: "Hair Dryer",
    price: 39.99,
    category: "Beauty",
    image: "https://picsum.photos/seed/42/200/200",
    rating: 4.3,
  },
  {
    name: "Sunscreen",
    price: 17.99,
    category: "Beauty",
    image: "https://picsum.photos/seed/43/200/200",
    rating: 4.1,
  },

  // Health - 4 products
  {
    name: "Protein Powder",
    price: 49.99,
    category: "Health",
    image: "https://picsum.photos/seed/44/200/200",
    rating: 4.4,
  },
  {
    name: "Multivitamins",
    price: 19.99,
    category: "Health",
    image: "https://picsum.photos/seed/45/200/200",
    rating: 4.2,
  },
  {
    name: "Green Tea Pack",
    price: 9.99,
    category: "Health",
    image: "https://picsum.photos/seed/46/200/200",
    rating: 4.6,
  },
  {
    name: "Fitness Tracker",
    price: 79.99,
    category: "Health",
    image: "https://picsum.photos/seed/47/200/200",
    rating: 4.3,
  },

  // Automotive - 3 products
  {
    name: "Car Phone Mount",
    price: 19.99,
    category: "Automotive",
    image: "https://picsum.photos/seed/48/200/200",
    rating: 4.0,
  },
  {
    name: "Dash Cam",
    price: 89.99,
    category: "Automotive",
    image: "https://picsum.photos/seed/49/200/200",
    rating: 4.5,
  },
  {
    name: "Car Vacuum",
    price: 49.99,
    category: "Automotive",
    image: "https://picsum.photos/seed/50/200/200",
    rating: 3.8,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully!`);
    console.log("\nProducts per category:");
    console.log("  Electronics: 8");
    console.log("  Clothing: 8");
    console.log("  Books: 7");
    console.log("  Home & Kitchen: 7");
    console.log("  Sports: 7");
    console.log("  Beauty: 6");
    console.log("  Health: 4");
    console.log("  Automotive: 3");

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
