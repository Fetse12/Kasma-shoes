const mongoose = require("mongoose");

const receiverAccountSchema = mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      enum: ["cbe", "cbebirr", "boa", "telebirr"],
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: function () {
        return this.paymentMethod === "cbe" || this.paymentMethod === "boa";
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
    },
    // Additional fields for different payment methods
    bankName: {
      type: String,
      required: function () {
        return this.paymentMethod === "cbe" || this.paymentMethod === "boa";
      },
    },
    phoneNumber: {
      type: String,
      required: function () {
        return (
          this.paymentMethod === "cbebirr" || this.paymentMethod === "telebirr"
        );
      },
    },
    // For display purposes
    displayName: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ReceiverAccount = mongoose.model(
  "ReceiverAccount",
  receiverAccountSchema
);

module.exports = ReceiverAccount;
