const ReceiverAccount = require("../models/ReceiverAccount");

// Get all receiver accounts
const getAllReceiverAccounts = async (req, res) => {
  try {
    const accounts = await ReceiverAccount.find({ isActive: true }).sort({
      paymentMethod: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error("Get receiver accounts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch receiver accounts",
    });
  }
};

// Get receiver accounts by payment method
const getReceiverAccountsByMethod = async (req, res) => {
  try {
    const { paymentMethod } = req.params;

    if (!["cbe", "cbebirr", "boa", "telebirr"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    const accounts = await ReceiverAccount.find({
      paymentMethod,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error("Get receiver accounts by method error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch receiver accounts",
    });
  }
};

// Create new receiver account (admin only)
const createReceiverAccount = async (req, res) => {
  try {
    const {
      paymentMethod,
      accountName,
      accountNumber,
      description,
      bankName,
      phoneNumber,
      displayName,
      instructions,
    } = req.body;

    if (!paymentMethod || !accountName || !accountNumber || !displayName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate based on payment method
    if ((paymentMethod === "cbe" || paymentMethod === "boa") && !bankName) {
      return res.status(400).json({
        success: false,
        message: "Bank name is required for bank transfers",
      });
    }

    if (
      (paymentMethod === "cbebirr" || paymentMethod === "telebirr") &&
      !phoneNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required for mobile payments",
      });
    }

    const newAccount = new ReceiverAccount({
      paymentMethod,
      accountName,
      accountNumber,
      description,
      bankName,
      phoneNumber,
      displayName,
      instructions,
    });

    const savedAccount = await newAccount.save();

    res.status(201).json({
      success: true,
      message: "Receiver account created successfully",
      data: savedAccount,
    });
  } catch (error) {
    console.error("Create receiver account error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create receiver account",
    });
  }
};

// Update receiver account (admin only)
const updateReceiverAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedAccount = await ReceiverAccount.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({
        success: false,
        message: "Receiver account not found",
      });
    }

    res.json({
      success: true,
      message: "Receiver account updated successfully",
      data: updatedAccount,
    });
  } catch (error) {
    console.error("Update receiver account error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update receiver account",
    });
  }
};

// Delete receiver account (admin only)
const deleteReceiverAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete by setting isActive to false
    const deletedAccount = await ReceiverAccount.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!deletedAccount) {
      return res.status(404).json({
        success: false,
        message: "Receiver account not found",
      });
    }

    res.json({
      success: true,
      message: "Receiver account deleted successfully",
    });
  } catch (error) {
    console.error("Delete receiver account error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete receiver account",
    });
  }
};

// Get all receiver accounts for admin (including inactive)
const getAllReceiverAccountsAdmin = async (req, res) => {
  try {
    const accounts = await ReceiverAccount.find().sort({
      paymentMethod: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error("Get all receiver accounts admin error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch receiver accounts",
    });
  }
};

module.exports = {
  getAllReceiverAccounts,
  getReceiverAccountsByMethod,
  createReceiverAccount,
  updateReceiverAccount,
  deleteReceiverAccount,
  getAllReceiverAccountsAdmin,
};
