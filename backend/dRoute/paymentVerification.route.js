const express = require("express");
const router = express.Router();
const {
  verifyCBEPayment,
  verifyCBEBirrPayment,
  verifyBOAPayment,
  verifyTelebirrPayment,
  getTransactionHistory,
  getAllTransactions,
} = require("../controller/paymentVerification.controller");
const authMiddleware = require("../middelware/authMiddleware");

// Payment verification routes
router.post("/verify/cbe", verifyCBEPayment);
router.post("/verify/cbebirr", verifyCBEBirrPayment);
router.post("/verify/boa", verifyBOAPayment);
router.post("/verify/telebirr", verifyTelebirrPayment);

// Transaction history routes
router.get("/transactions/:userId", authMiddleware, getTransactionHistory);
router.get("/transactions", authMiddleware, getAllTransactions);

module.exports = router;
