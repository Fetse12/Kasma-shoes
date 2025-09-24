const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cbe", "cbebirr", "boa", "telebirr"],
      required: true,
    },
    receivedAmount: {
      type: Number,
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    receiverAccountNumber: {
      type: String,
      required: true,
    },
    payerAccountNumber: {
      type: String,
      default: "none",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "failed"],
      default: "verified",
    },
    transactionDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    verifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
