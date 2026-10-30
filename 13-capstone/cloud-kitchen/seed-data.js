import dotenv from "dotenv";
import mongoose from "mongoose";
import Kitchen from "./models/kitchen.model.js";
import Menu from "./models/menu.model.js";
import User from "./models/user.model.js";

dotenv.config();

async function seedData() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to DB");

  // Find admin user
  const admin = await User.findOne({ email: "admin@gmail.com" });
  if (!admin) {
    console.log("Admin user not found. Run seed-admin first.");
    process.exit(1);
  }

  // Clear existing data
  await Kitchen.deleteMany({});
  await Menu.deleteMany({});
  console.log("Cleared existing kitchens and menu items");

  // Create Kitchens
  const kitchens = await Kitchen.insertMany([
    {
      name: "Spice Garden",
      owner: admin._id,
      description:
        "Authentic North Indian cuisine with rich flavors and fresh spices",
      cuisine: ["North Indian", "Mughlai", "Tandoor"],
      address: {
        street: "45 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      },
      image: {
        public_id: "",
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      },
      rating: 4.5,
      totalReviews: 120,
      isOpen: true,
      deliveryTime: 30,
      deliveryCharge: 25,
    },
    {
      name: "Dragon Wok",
      owner: admin._id,
      description: "Fiery Chinese and Asian fusion dishes made fresh to order",
      cuisine: ["Chinese", "Thai", "Asian"],
      address: {
        street: "12 Park Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400002",
      },
      image: {
        public_id: "",
        url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
      },
      rating: 4.2,
      totalReviews: 85,
      isOpen: true,
      deliveryTime: 25,
      deliveryCharge: 30,
    },
    {
      name: "Green Leaf Kitchen",
      owner: admin._id,
      description:
        "Healthy, organic, and 100% vegetarian meals for mindful eating",
      cuisine: ["South Indian", "Healthy", "Vegan"],
      address: {
        street: "8 Brigade Road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
      },
      image: {
        public_id: "",
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      },
      rating: 4.7,
      totalReviews: 200,
      isOpen: true,
      deliveryTime: 20,
      deliveryCharge: 0,
    },
    {
      name: "Biryani Blues",
      owner: admin._id,
      description: "Hyderabadi dum biryani cooked in traditional handi style",
      cuisine: ["Hyderabadi", "Biryani", "Mughlai"],
      address: {
        street: "23 Jubilee Hills",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500033",
      },
      image: {
        public_id: "",
        url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
      },
      rating: 4.6,
      totalReviews: 310,
      isOpen: true,
      deliveryTime: 35,
      deliveryCharge: 20,
    },
    {
      name: "Pizza Planet",
      owner: admin._id,
      description: "Wood-fired pizzas with imported cheese and fresh toppings",
      cuisine: ["Italian", "Pizza", "Pasta"],
      address: {
        street: "5 Connaught Place",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
      },
      image: {
        public_id: "",
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      },
      rating: 4.3,
      totalReviews: 150,
      isOpen: true,
      deliveryTime: 40,
      deliveryCharge: 40,
    },
  ]);

  console.log(`Created ${kitchens.length} kitchens`);

  // Menu items for Spice Garden
  const spiceGardenMenu = [
    {
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken",
      price: 280,
      category: "non-veg",
      foodType: "main-course",
      kitchen: kitchens[0]._id,
      image: {
        url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300",
      },
    },
    {
      name: "Paneer Tikka",
      description: "Grilled cottage cheese marinated in spices",
      price: 220,
      category: "veg",
      foodType: "starter",
      kitchen: kitchens[0]._id,
      image: {
        url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300",
      },
    },
    {
      name: "Dal Makhani",
      description: "Slow-cooked black lentils in butter and cream",
      price: 180,
      category: "veg",
      foodType: "main-course",
      kitchen: kitchens[0]._id,
      image: {
        url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300",
      },
    },
    {
      name: "Garlic Naan",
      description: "Soft naan bread with garlic butter",
      price: 60,
      category: "veg",
      foodType: "snack",
      kitchen: kitchens[0]._id,
      image: {
        url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300",
      },
    },
    {
      name: "Gulab Jamun",
      description: "Deep-fried milk dumplings soaked in sugar syrup",
      price: 80,
      category: "veg",
      foodType: "dessert",
      kitchen: kitchens[0]._id,
      image: {
        url: "https://images.unsplash.com/photo-1666190050267-39e080073afe?w=300",
      },
    },
    {
      name: "Mango Lassi",
      description: "Chilled yogurt drink with fresh mango pulp",
      price: 90,
      category: "veg",
      foodType: "beverage",
      kitchen: kitchens[0]._id,
      image: {
        url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300",
      },
    },
  ];

  // Menu items for Dragon Wok
  const dragonWokMenu = [
    {
      name: "Chicken Manchurian",
      description: "Crispy fried chicken in spicy Manchurian sauce",
      price: 250,
      category: "non-veg",
      foodType: "starter",
      kitchen: kitchens[1]._id,
      image: {
        url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300",
      },
    },
    {
      name: "Veg Fried Rice",
      description: "Wok-tossed rice with fresh vegetables",
      price: 180,
      category: "veg",
      foodType: "main-course",
      kitchen: kitchens[1]._id,
      image: {
        url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300",
      },
    },
    {
      name: "Hakka Noodles",
      description: "Stir-fried noodles with vegetables and soy sauce",
      price: 160,
      category: "veg",
      foodType: "main-course",
      kitchen: kitchens[1]._id,
      image: {
        url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300",
      },
    },
    {
      name: "Spring Rolls",
      description: "Crispy rolls stuffed with cabbage and carrots",
      price: 140,
      category: "veg",
      foodType: "starter",
      kitchen: kitchens[1]._id,
      image: {
        url: "https://images.unsplash.com/photo-1536879933-7de5aa1a0b81?w=300",
      },
    },
    {
      name: "Hot & Sour Soup",
      description: "Spicy soup with mushrooms, tofu and veggies",
      price: 120,
      category: "veg",
      foodType: "starter",
      kitchen: kitchens[1]._id,
      image: {
        url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300",
      },
    },
  ];

  // Menu items for Green Leaf Kitchen
  const greenLeafMenu = [
    {
      name: "Masala Dosa",
      description: "Crispy crepe with spiced potato filling",
      price: 120,
      category: "veg",
      foodType: "main-course",
      kitchen: kitchens[2]._id,
      image: {
        url: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300",
      },
    },
    {
      name: "Idli Sambar",
      description: "Steamed rice cakes with lentil stew",
      price: 80,
      category: "veg",
      foodType: "snack",
      kitchen: kitchens[2]._id,
      image: {
        url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300",
      },
    },
    {
      name: "Quinoa Buddha Bowl",
      description: "Quinoa with roasted veggies, avocado and tahini",
      price: 320,
      category: "vegan",
      foodType: "main-course",
      kitchen: kitchens[2]._id,
      image: {
        url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300",
      },
    },
    {
      name: "Green Smoothie",
      description: "Spinach, banana, and almond milk blend",
      price: 150,
      category: "vegan",
      foodType: "beverage",
      kitchen: kitchens[2]._id,
      image: {
        url: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300",
      },
    },
    {
      name: "Avocado Toast",
      description: "Multigrain toast with smashed avocado and seeds",
      price: 200,
      category: "vegan",
      foodType: "snack",
      kitchen: kitchens[2]._id,
      image: {
        url: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300",
      },
    },
  ];

  // Menu items for Biryani Blues
  const biryaniMenu = [
    {
      name: "Chicken Dum Biryani",
      description: "Slow-cooked basmati rice with spiced chicken",
      price: 320,
      category: "non-veg",
      foodType: "main-course",
      kitchen: kitchens[3]._id,
      image: {
        url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300",
      },
    },
    {
      name: "Mutton Biryani",
      description: "Premium mutton pieces with fragrant rice",
      price: 380,
      category: "non-veg",
      foodType: "main-course",
      kitchen: kitchens[3]._id,
      image: {
        url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300",
      },
    },
    {
      name: "Veg Biryani",
      description: "Mixed vegetables cooked with aromatic basmati",
      price: 220,
      category: "veg",
      foodType: "main-course",
      kitchen: kitchens[3]._id,
      image: {
        url: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=300",
      },
    },
    {
      name: "Raita",
      description: "Cool yogurt with cucumber and mint",
      price: 50,
      category: "veg",
      foodType: "snack",
      kitchen: kitchens[3]._id,
      image: {
        url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300",
      },
    },
    {
      name: "Phirni",
      description: "Creamy rice pudding with cardamom and pistachios",
      price: 90,
      category: "veg",
      foodType: "dessert",
      kitchen: kitchens[3]._id,
      image: {
        url: "https://images.unsplash.com/photo-1571006628667-7956a2c4f98c?w=300",
      },
    },
  ];

  // Menu items for Pizza Planet
  const pizzaMenu = [
    {
      name: "Margherita Pizza",
      description: "Classic pizza with mozzarella and fresh basil",
      price: 299,
      category: "veg",
      foodType: "main-course",
      kitchen: kitchens[4]._id,
      image: {
        url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300",
      },
    },
    {
      name: "Pepperoni Pizza",
      description: "Loaded with spicy pepperoni and cheese",
      price: 399,
      category: "non-veg",
      foodType: "main-course",
      kitchen: kitchens[4]._id,
      image: {
        url: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300",
      },
    },
    {
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: 149,
      category: "veg",
      foodType: "starter",
      kitchen: kitchens[4]._id,
      image: {
        url: "https://images.unsplash.com/photo-1619531040576-f9416740661b?w=300",
      },
    },
    {
      name: "Pasta Alfredo",
      description: "Creamy white sauce pasta with mushrooms",
      price: 249,
      category: "veg",
      foodType: "main-course",
      kitchen: kitchens[4]._id,
      image: {
        url: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=300",
      },
    },
    {
      name: "Cold Coffee",
      description: "Chilled coffee with ice cream",
      price: 130,
      category: "veg",
      foodType: "beverage",
      kitchen: kitchens[4]._id,
      image: {
        url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300",
      },
    },
  ];

  const allMenuItems = [
    ...spiceGardenMenu,
    ...dragonWokMenu,
    ...greenLeafMenu,
    ...biryaniMenu,
    ...pizzaMenu,
  ];
  await Menu.insertMany(allMenuItems);
  console.log(`Created ${allMenuItems.length} menu items`);

  console.log("\n✅ Seed complete! Your kitchens:");
  kitchens.forEach((k) =>
    console.log(`   - ${k.name} (${k.cuisine.join(", ")})`),
  );

  await mongoose.disconnect();
  process.exit(0);
}

seedData();
