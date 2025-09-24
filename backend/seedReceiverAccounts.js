const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ReceiverAccount = require("./models/ReceiverAccount");
const connectDB = require("./config/db");

dotenv.config();

async function seedReceiverAccounts() {
  await connectDB();

  // Clear existing receiver accounts
  await ReceiverAccount.deleteMany({});

  // Create receiver accounts for each payment method
  const receiverAccounts = await ReceiverAccount.insertMany([
    {
      paymentMethod: "cbe",
      accountName: "KASMA SHOES",
      accountNumber: "1000156117876",
      displayName: "Main CBE Account",
      description: "Primary account for CBE transfers",
      bankName: "Commercial Bank of Ethiopia",
      instructions:
        "Please include your order reference in the transfer description",
      isActive: true,
    },
    {
      paymentMethod: "cbe",
      accountName: "KASMA SHOES",
      accountNumber: "1000156117877",
      displayName: "Secondary CBE Account",
      description: "Backup account for CBE transfers",
      bankName: "Commercial Bank of Ethiopia",
      instructions: "Use this account if the main account is unavailable",
      isActive: true,
    },
    {
      paymentMethod: "cbebirr",
      accountName: "KASMA SHOES",
      phoneNumber: "0911755025",
      displayName: "Main CBEBirr Account",
      description: "Primary CBEBirr mobile payment account",
      instructions: "Send payment via CBEBirr mobile app",
      isActive: true,
    },
    {
      paymentMethod: "cbebirr",
      accountName: "KASMA SHOES",
      phoneNumber: "0911755026",
      displayName: "Secondary CBEBirr Account",
      description: "Backup CBEBirr mobile payment account",
      instructions: "Alternative CBEBirr account",
      isActive: true,
    },
    {
      paymentMethod: "boa",
      accountName: "KASMA SHOES",
      accountNumber: "2519482562229549",
      displayName: "Main BOA Account",
      description: "Primary Bank of Abyssinia account",
      bankName: "Bank of Abyssinia",
      instructions: "Transfer to Bank of Abyssinia account",
      isActive: true,
    },
    {
      paymentMethod: "telebirr",
      accountName: "KASMA SHOES",
      phoneNumber: "251948256020",
      displayName: "Main Telebirr Account",
      description: "Primary Telebirr mobile payment account",
      instructions: "Send payment via Telebirr mobile app",
      isActive: true,
    },
    {
      paymentMethod: "telebirr",
      accountName: "KASMA SHOES",
      phoneNumber: "251948256021",
      displayName: "Secondary Telebirr Account",
      description: "Backup Telebirr mobile payment account",
      instructions: "Alternative Telebirr account",
      isActive: true,
    },
  ]);

  console.log("✅ Receiver accounts seeded successfully!");
  console.log(`Created ${receiverAccounts.length} receiver accounts`);

  mongoose.connection.close();
}

seedReceiverAccounts().catch((err) => {
  console.error("❌ Seeding receiver accounts error:", err);
  mongoose.connection.close();
});
