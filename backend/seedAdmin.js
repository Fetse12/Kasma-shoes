const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user.js");
const Shoes = require("./models/shoes.js");
const Order = require("./models/orders.js");
const Favorite = require("./models/Favorite.js");
require("dotenv").config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/kasma-shoes"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Create admin user
const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@kasmashoes.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return existingAdmin;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = new User({
      email: "admin@kasmashoes.com",
      password: hashedPassword,
      Telegram_username: "kasma_admin",
      PhoneNumber: "+1234567890",
    });

    const savedAdmin = await adminUser.save();
    console.log("Admin user created successfully:", savedAdmin.email);
    return savedAdmin;
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
};

// Create sample shoes
const createSampleShoes = async () => {
  try {
    const sampleShoes = [
      {
        shoes_name: "Classic White Sneakers",
        shoes_type: "men",
        type: "sneakers",
        Price: 89.99,
        isSpecial: false,
        isAvailable: true,
        shoe_Size: 42,
        DiscountPercent: 0,
        description: "Comfortable white sneakers perfect for everyday wear",
        imgUrl: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
        ],
        tags: ["casual", "white", "sneakers", "comfortable"],
      },
      {
        shoes_name: "Elegant Black Heels",
        shoes_type: "women",
        type: "heels",
        Price: 129.99,
        isSpecial: true,
        isAvailable: true,
        shoe_Size: 38,
        DiscountPercent: 15,
        description: "Elegant black heels perfect for formal occasions",
        imgUrl: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
        ],
        tags: ["formal", "black", "heels", "elegant"],
      },
      {
        shoes_name: "Kids Running Shoes",
        shoes_type: "boy",
        type: "running_shoes",
        Price: 59.99,
        isSpecial: false,
        isAvailable: true,
        shoe_Size: 28,
        DiscountPercent: 10,
        description: "Comfortable running shoes for active kids",
        imgUrl: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
        ],
        tags: ["kids", "running", "sports", "comfortable"],
      },
      {
        shoes_name: "Girl's Pink Sandals",
        shoes_type: "girl",
        type: "sandals",
        Price: 39.99,
        isSpecial: false,
        isAvailable: true,
        shoe_Size: 24,
        DiscountPercent: 0,
        description: "Cute pink sandals perfect for summer",
        imgUrl: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
        ],
        tags: ["girls", "pink", "sandals", "summer"],
      },
      {
        shoes_name: "Professional Oxford Shoes",
        shoes_type: "men",
        type: "formal_shoes",
        Price: 149.99,
        isSpecial: true,
        isAvailable: true,
        shoe_Size: 43,
        DiscountPercent: 20,
        description: "Professional oxford shoes for business attire",
        imgUrl: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
        ],
        tags: ["formal", "business", "oxford", "professional"],
      },
    ];

    // Check if shoes already exist
    const existingShoes = await Shoes.countDocuments();
    if (existingShoes > 0) {
      console.log("Sample shoes already exist");
      return;
    }

    const createdShoes = await Shoes.insertMany(sampleShoes);
    console.log(`Created ${createdShoes.length} sample shoes`);
    return createdShoes;
  } catch (error) {
    console.error("Error creating sample shoes:", error);
    throw error;
  }
};

// Create sample orders
const createSampleOrders = async (adminUser) => {
  try {
    const sampleOrders = [
      {
        fullName: "John Doe",
        shoes_id: [], // Will be populated with actual shoe IDs
        orderDeliverd: "notDeliverd",
        phoneNumber: "+1234567890",
        userId: adminUser._id.toString(),
      },
      {
        fullName: "Jane Smith",
        shoes_id: [], // Will be populated with actual shoe IDs
        orderDeliverd: "deliverd",
        phoneNumber: "+1234567891",
        userId: adminUser._id.toString(),
      },
      {
        fullName: "Mike Johnson",
        shoes_id: [], // Will be populated with actual shoe IDs
        orderDeliverd: "notDeliverd",
        phoneNumber: "+1234567892",
        userId: adminUser._id.toString(),
      },
    ];

    // Get some shoe IDs to add to orders
    const shoes = await Shoes.find().limit(3);
    if (shoes.length > 0) {
      sampleOrders.forEach((order, index) => {
        order.shoes_id = [shoes[index % shoes.length]._id.toString()];
      });
    }

    // Check if orders already exist
    const existingOrders = await Order.countDocuments();
    if (existingOrders > 0) {
      console.log("Sample orders already exist");
      return;
    }

    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`Created ${createdOrders.length} sample orders`);
    return createdOrders;
  } catch (error) {
    console.error("Error creating sample orders:", error);
    throw error;
  }
};

// Create sample users
const createSampleUsers = async () => {
  try {
    const sampleUsers = [
      {
        email: "customer1@example.com",
        password: await bcrypt.hash("password123", 10),
        Telegram_username: "customer1",
        PhoneNumber: "+1234567893",
      },
      {
        email: "customer2@example.com",
        password: await bcrypt.hash("password123", 10),
        Telegram_username: "customer2",
        PhoneNumber: "+1234567894",
      },
    ];

    // Check if sample users already exist
    const existingUsers = await User.countDocuments({
      email: { $in: sampleUsers.map((u) => u.email) },
    });
    if (existingUsers > 0) {
      console.log("Sample users already exist");
      return;
    }

    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} sample users`);
    return createdUsers;
  } catch (error) {
    console.error("Error creating sample users:", error);
    throw error;
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // Connect to database
    await connectDB();

    // Create admin user
    const adminUser = await createAdminUser();

    // Create sample data
    await createSampleShoes();
    await createSampleUsers();
    await createSampleOrders(adminUser);

    console.log("Database seeding completed successfully!");
    console.log("\n=== ADMIN CREDENTIALS ===");
    console.log("Email: admin@kasmashoes.com");
    console.log("Password: admin123");
    console.log("========================\n");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
