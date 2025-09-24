const express = require("express");
const router = express.Router();
const {
  getAllReceiverAccounts,
  getReceiverAccountsByMethod,
  createReceiverAccount,
  updateReceiverAccount,
  deleteReceiverAccount,
  getAllReceiverAccountsAdmin,
} = require("../controller/receiverAccount.controller");
const authMiddleware = require("../middelware/authMiddleware");

// Public routes (for checkout)
router.get("/receiver-accounts", getAllReceiverAccounts);
router.get("/receiver-accounts/:paymentMethod", getReceiverAccountsByMethod);

// Admin routes
router.get("/admin/receiver-accounts", authMiddleware, getAllReceiverAccountsAdmin);
router.post("/admin/receiver-accounts", authMiddleware, createReceiverAccount);
router.put("/admin/receiver-accounts/:id", authMiddleware, updateReceiverAccount);
router.delete("/admin/receiver-accounts/:id", authMiddleware, deleteReceiverAccount);

module.exports = router;
