const axios = require("axios");
const Transaction = require("../models/Transaction");
const Order = require("../models/orders");
const User = require("../models/user");

const API_KEY = "3T2A7THKBDMV2402G4B5S52QXYidofcHY4SNVUBZ";
const BASE_URL = "https://ex.pro.et";

// Helper function to verify payment with external API
const verifyPaymentWithAPI = async (paymentMethod, payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/verify/${paymentMethod}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Payment verification error for ${paymentMethod}:`,
      error.response?.data || error.message
    );
    throw new Error(
      `Payment verification failed: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

// CBE Payment Verification
const verifyCBEPayment = async (req, res) => {
  try {
    const {
      referenceId,
      receivedAmount,
      receiverName,
      receiverAccountNumber,
      payerAccountNumber,
    } = req.body;

    if (
      !referenceId ||
      !receivedAmount ||
      !receiverName ||
      !receiverAccountNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for CBE payment verification",
      });
    }

    const payload = {
      referenceId,
      receivedAmount: receivedAmount.toString(),
      receiverName,
      receiverAccountNumber,
      payerAccountNumber: payerAccountNumber || "none",
    };

    const verificationResult = await verifyPaymentWithAPI("cbe", payload);

    if (verificationResult.success) {
      // Store transaction in database
      const transaction = new Transaction({
        referenceId: verificationResult.data.referenceId,
        paymentMethod: "cbe",
        receivedAmount: verificationResult.data.receivedAmount,
        receiverName: verificationResult.data.receiverName,
        receiverAccountNumber: verificationResult.data.payerAccountNumber,
        payerAccountNumber: verificationResult.data.payerAccountNumber,
        verificationStatus: "verified",
        transactionDetails: verificationResult.data,
      });

      await transaction.save();

      res.json({
        success: true,
        message: "CBE payment verified successfully",
        data: verificationResult.data,
        transactionId: transaction._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message:
          verificationResult.message || "CBE payment verification failed",
      });
    }
  } catch (error) {
    console.error("CBE verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error during CBE verification",
    });
  }
};

// CBEBirr Payment Verification
const verifyCBEBirrPayment = async (req, res) => {
  try {
    const {
      referenceId,
      receivedAmount,
      receiverName,
      receiverAccountNumber,
      payerAccountNumber,
    } = req.body;

    if (
      !referenceId ||
      !receivedAmount ||
      !receiverName ||
      !receiverAccountNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for CBEBirr payment verification",
      });
    }

    const payload = {
      referenceId,
      receivedAmount: receivedAmount.toString(),
      receiverName,
      receiverAccountNumber,
      payerAccountNumber: payerAccountNumber || "none",
    };

    const verificationResult = await verifyPaymentWithAPI("cbebirr", payload);

    if (verificationResult.success) {
      const transaction = new Transaction({
        referenceId: verificationResult.data.referenceId,
        paymentMethod: "cbebirr",
        receivedAmount: verificationResult.data.receivedAmount,
        receiverName: verificationResult.data.receiverName,
        receiverAccountNumber: verificationResult.data.payerAccountNumber,
        payerAccountNumber: verificationResult.data.payerAccountNumber,
        verificationStatus: "verified",
        transactionDetails: verificationResult.data,
      });

      await transaction.save();

      res.json({
        success: true,
        message: "CBEBirr payment verified successfully",
        data: verificationResult.data,
        transactionId: transaction._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message:
          verificationResult.message || "CBEBirr payment verification failed",
      });
    }
  } catch (error) {
    console.error("CBEBirr verification error:", error);
    res.status(500).json({
      success: false,
      message:
        error.message || "Internal server error during CBEBirr verification",
    });
  }
};

// BOA Payment Verification
const verifyBOAPayment = async (req, res) => {
  try {
    const {
      referenceId,
      receivedAmount,
      receiverName,
      receiverAccountNumber,
      payerAccountNumber,
    } = req.body;

    if (
      !referenceId ||
      !receivedAmount ||
      !receiverName ||
      !receiverAccountNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for BOA payment verification",
      });
    }

    const payload = {
      referenceId,
      receivedAmount: receivedAmount.toString(),
      receiverName,
      receiverAccountNumber,
      payerAccountNumber: payerAccountNumber || "none",
    };

    const verificationResult = await verifyPaymentWithAPI("boa", payload);

    if (verificationResult.success) {
      const transaction = new Transaction({
        referenceId: verificationResult.data.referenceId,
        paymentMethod: "boa",
        receivedAmount: verificationResult.data.receivedAmount,
        receiverName: verificationResult.data.receiverName,
        receiverAccountNumber: verificationResult.data.payerAccountNumber,
        payerAccountNumber: verificationResult.data.payerAccountNumber,
        verificationStatus: "verified",
        transactionDetails: verificationResult.data,
      });

      await transaction.save();

      res.json({
        success: true,
        message: "BOA payment verified successfully",
        data: verificationResult.data,
        transactionId: transaction._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message:
          verificationResult.message || "BOA payment verification failed",
      });
    }
  } catch (error) {
    console.error("BOA verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error during BOA verification",
    });
  }
};

// Telebirr Payment Verification
const verifyTelebirrPayment = async (req, res) => {
  try {
    const {
      referenceId,
      receivedAmount,
      receiverName,
      receiverAccountNumber,
      payerAccountNumber,
    } = req.body;

    if (
      !referenceId ||
      !receivedAmount ||
      !receiverName ||
      !receiverAccountNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for Telebirr payment verification",
      });
    }

    const payload = {
      referenceId,
      receivedAmount: receivedAmount.toString(),
      receiverName,
      receiverAccountNumber,
      payerAccountNumber: payerAccountNumber || "none",
    };

    const verificationResult = await verifyPaymentWithAPI("telebirr", payload);

    if (verificationResult.success) {
      const transaction = new Transaction({
        referenceId: verificationResult.data.referenceId,
        paymentMethod: "telebirr",
        receivedAmount: verificationResult.data.receivedAmount,
        receiverName: verificationResult.data.receiverName,
        receiverAccountNumber: verificationResult.data.payerAccountNumber,
        payerAccountNumber: verificationResult.data.payerAccountNumber,
        verificationStatus: "verified",
        transactionDetails: verificationResult.data,
      });

      await transaction.save();

      res.json({
        success: true,
        message: "Telebirr payment verified successfully",
        data: verificationResult.data,
        transactionId: transaction._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message:
          verificationResult.message || "Telebirr payment verification failed",
      });
    }
  } catch (error) {
    console.error("Telebirr verification error:", error);
    res.status(500).json({
      success: false,
      message:
        error.message || "Internal server error during Telebirr verification",
    });
  }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({ userId })
      .populate("orderId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Get transaction history error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transaction history",
    });
  }
};

// Get all transactions (admin)
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("orderId")
      .populate("userId", "Telegram_username email PhoneNumber")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Get all transactions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};

module.exports = {
  verifyCBEPayment,
  verifyCBEBirrPayment,
  verifyBOAPayment,
  verifyTelebirrPayment,
  getTransactionHistory,
  getAllTransactions,
};
