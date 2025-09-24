// backend/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const Shoes = require("./models/shoes");
const Order = require("./models/orders");
const Favorite = require("./models/Favorite");
const connectDB = require("./config/db");

dotenv.config();

async function seed() {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Shoes.deleteMany({});
  await Order.deleteMany({});
  await Favorite.deleteMany({});

  // Create users
  const users = await User.insertMany([
    {
      Telegram_username: "john_doe",
      PhoneNumber: "1234567890",
      password: "hashedpassword1",
      email: "john@example.com",
    },
    {
      Telegram_username: "jane_smith",
      PhoneNumber: "0987654321",
      password: "hashedpassword2",
      email: "jane@example.com",
    },
  ]);

  // Create shoes - 14 male shoes
  const shoes = await Shoes.insertMany([
    {
      shoes_name: "Classic Black Derby",
      shoes_type: "men",
      type: "formal_shoes",
      Price: 129.99,
      isSpecial: false,
      isAvailable: true,
      shoe_Size: [40, 41, 42, 43, 44],
      DiscountPercent: 10,
      description:
        "Elegant black derby shoes perfect for formal occasions and business meetings.",
      imgUrl: [
        "image.pnghttps://production-cdn-bynder.munrofootweargroup.com.au/m/f5c9812d0a60dcf8/original/CK10246BLALE_2.jpg?auto=webp&width=640&quality=85",
        "image.pnghttps://production-cdn-bynder.munrofootweargroup.com.au/m/f5c9812d0a60dcf8/original/CK10246BLALE_2.jpg?auto=webp&width=640&quality=85",
        "image.pnghttps://production-cdn-bynder.munrofootweargroup.com.au/m/f5c9812d0a60dcf8/original/CK10246BLALE_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["formal", "business", "classic"],
    },
    {
      shoes_name: "Brown Leather Oxford",
      shoes_type: "men",
      type: "formal_shoes",
      Price: 149.99,
      isSpecial: true,
      isAvailable: true,
      shoe_Size: [39, 40, 41, 42, 43],
      DiscountPercent: 15,
      description:
        "Premium brown leather oxford shoes with superior craftsmanship and comfort.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/12ee57c429a2448f/original/SK11919DBYAA_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/12ee57c429a2448f/original/SK11919DBYAA_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/12ee57c429a2448f/original/SK11919DBYAA_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["premium", "leather", "oxford"],
    },
    {
      shoes_name: "Casual Canvas Sneakers",
      shoes_type: "men",
      type: "sneakers",
      Price: 79.99,
      isSpecial: false,
      isAvailable: true,
      shoe_Size: [41, 42, 43, 44, 45],
      DiscountPercent: 5,
      description:
        "Comfortable canvas sneakers perfect for everyday wear and casual outings.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/70c834130fadfe85/original/CF11709OOJCA_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/70c834130fadfe85/original/CF11709OOJCA_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/70c834130fadfe85/original/CF11709OOJCA_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["casual", "canvas", "comfortable"],
    },
    {
      shoes_name: "Dark Blue Dress Shoes",
      shoes_type: "men",
      type: "formal_shoes",
      Price: 119.99,
      isSpecial: false,
      isAvailable: true,
      shoe_Size: [38, 39, 40, 41, 42],
      DiscountPercent: 12,
      description:
        "Sophisticated dark blue dress shoes ideal for professional settings.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/1f875dd1704093c9/original/CF12389DBYS4_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/1f875dd1704093c9/original/CF12389DBYS4_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/1f875dd1704093c9/original/CF12389DBYS4_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["dress", "professional", "blue"],
    },
    {
      shoes_name: "Tan Leather Loafers",
      shoes_type: "men",
      type: "formal_shoes",
      Price: 99.99,
      isSpecial: true,
      isAvailable: true,
      shoe_Size: [42, 43, 44, 45, 46],
      DiscountPercent: 20,
      description:
        "Versatile tan leather loafers that transition seamlessly from office to evening.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/10af62aebf2c52d6/original/CF12363T07LE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/10af62aebf2c52d6/original/CF12363T07LE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/10af62aebf2c52d6/original/CF12363T07LE_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["loafers", "versatile", "tan"],
    },
    {
      shoes_name: "Navy Blue Casual Shoes",
      shoes_type: "men",
      type: "sneakers",
      Price: 89.99,
      isSpecial: false,
      isAvailable: true,
      shoe_Size: [40, 41, 42, 43, 44],
      DiscountPercent: 8,
      description:
        "Stylish navy blue casual shoes perfect for smart-casual occasions.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/7614d76beac9c4b0/original/CF12395BLALE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/7614d76beac9c4b0/original/CF12395BLALE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/7614d76beac9c4b0/original/CF12395BLALE_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["navy", "smart-casual", "stylish"],
    },
    {
      shoes_name: "Brown Suede Boots",
      shoes_type: "men",
      type: "boots",
      Price: 159.99,
      isSpecial: true,
      isAvailable: true,
      shoe_Size: [39, 40, 41, 42, 43],
      DiscountPercent: 18,
      description:
        "Premium brown suede boots with excellent durability and weather resistance.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/229f5ddddaa9fa3c/original/CF12364T07LE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/229f5ddddaa9fa3c/original/CF12364T07LE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/229f5ddddaa9fa3c/original/CF12364T07LE_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["boots", "suede", "durable"],
    },
    {
      shoes_name: "Black Leather Sneakers",
      shoes_type: "men",
      type: "sneakers",
      Price: 109.99,
      isSpecial: false,
      isAvailable: true,
      shoe_Size: [41, 42, 43, 44, 45],
      DiscountPercent: 7,
      description:
        "Sleek black leather sneakers combining comfort with modern style.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/4e7ea5c93c6bcb08/original/CF12392T07LE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/4e7ea5c93c6bcb08/original/CF12392T07LE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/4e7ea5c93c6bcb08/original/CF12392T07LE_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["leather", "modern", "sleek"],
    },
    {
      shoes_name: "Gray Athletic Shoes",
      shoes_type: "men",
      type: "athletic_shoes",
      Price: 139.99,
      isSpecial: true,
      isAvailable: true,
      shoe_Size: [40, 41, 42, 43, 44],
      DiscountPercent: 14,
      description:
        "High-performance gray athletic shoes designed for active lifestyles.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/337979617b54ceaa/original/CF12226GRYAA_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/337979617b54ceaa/original/CF12226GRYAA_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/337979617b54ceaa/original/CF12226GRYAA_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["athletic", "performance", "gray"],
    },
    {
      shoes_name: "Black Dress Boots",
      shoes_type: "men",
      type: "boots",
      Price: 179.99,
      isSpecial: false,
      isAvailable: true,
      shoe_Size: [42, 43, 44, 45, 46],
      DiscountPercent: 11,
      description:
        "Elegant black dress boots perfect for formal events and winter wear.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/71bdc14e24f353f8/original/CF12210BLASS_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/71bdc14e24f353f8/original/CF12210BLASS_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/71bdc14e24f353f8/original/CF12210BLASS_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["dress", "boots", "elegant"],
    },
    {
      shoes_name: "Blue Canvas Sneakers",
      shoes_type: "men",
      type: "sneakers",
      Price: 69.99,
      isSpecial: false,
      isAvailable: true,
      shoe_Size: [38, 39, 40, 41, 42],
      DiscountPercent: 6,
      description:
        "Comfortable blue canvas sneakers ideal for casual weekend wear.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/19d2f2eb7f74756b/original/SK11952BLASS_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/19d2f2eb7f74756b/original/SK11952BLASS_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/19d2f2eb7f74756b/original/SK11952BLASS_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["canvas", "casual", "weekend"],
    },
    {
      shoes_name: "Red Leather Sneakers",
      shoes_type: "men",
      type: "sneakers",
      Price: 119.99,
      isSpecial: true,
      isAvailable: true,
      shoe_Size: [39, 40, 41, 42, 43],
      DiscountPercent: 16,
      description:
        "Bold red leather sneakers that make a statement while providing comfort.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/4c30f7912c6abeef/original/SK11952R14SS_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/4c30f7912c6abeef/original/SK11952R14SS_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/4c30f7912c6abeef/original/SK11952R14SS_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["red", "bold", "statement"],
    },
    {
      shoes_name: "Brown Running Shoes",
      shoes_type: "men",
      type: "running_shoes",
      Price: 149.99,
      isSpecial: false,
      isAvailable: true,
      shoe_Size: [41, 42, 43, 44, 45],
      DiscountPercent: 9,
      description:
        "High-performance brown running shoes with advanced cushioning technology.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/5a5accbd29af4551/original/SK11945B98DE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/5a5accbd29af4551/original/SK11945B98DE_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/5a5accbd29af4551/original/SK11945B98DE_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["running", "performance", "cushioning"],
    },
    {
      shoes_name: "Green Casual Boots",
      shoes_type: "men",
      type: "boots",
      Price: 129.99,
      isSpecial: true,
      isAvailable: true,
      shoe_Size: [40, 41, 42, 43, 44],
      DiscountPercent: 13,
      description:
        "Stylish green casual boots perfect for outdoor adventures and urban exploration.",
      imgUrl: [
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/3a27fb7564fa7ebf/original/CF12389NGVS4_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/3a27fb7564fa7ebf/original/CF12389NGVS4_2.jpg?auto=webp&width=640&quality=85",
        "https://production-cdn-bynder.munrofootweargroup.com.au/m/3a27fb7564fa7ebf/original/CF12389NGVS4_2.jpg?auto=webp&width=640&quality=85",
      ],
      tags: ["outdoor", "adventure", "green"],
    },
  ]);

  // Create orders
  const orders = await Order.insertMany([
    {
      fullName: "John Doe",
      shoes_id: [shoes[0]._id.toString()],
      orderDeliverd: "notDeliverd",
      phoneNumber: "1234567890",
      userId: users[0]._id.toString(),
    },
    {
      fullName: "Jane Smith",
      shoes_id: [shoes[1]._id.toString()],
      orderDeliverd: "deliverd",
      phoneNumber: "0987654321",
      userId: users[1]._id.toString(),
    },
  ]);

  // Create favorites
  await Favorite.insertMany([
    {
      user_id: users[0]._id.toString(),
      favorite_food_id: [{ shoeId: shoes[0]._id.toString() }],
    },
    {
      user_id: users[1]._id.toString(),
      favorite_food_id: [{ shoeId: shoes[1]._id.toString() }],
    },
  ]);

  console.log("✅ Database seeded!");
  mongoose.connection.close();
}

seed().catch((err) => {
  console.error("❌ Seeding error:", err);
  mongoose.connection.close();
});
