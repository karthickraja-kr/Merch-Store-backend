const express = require("express");
const router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { isSigned, isAdmin, isAuthenticated } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// routes
// create
router.post(
  "order/create/:userId",
  isSigned,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);
// listAllOrder
router.get(
  "order/all/:userId",
  isSigned,
  isAuthenticated,
  isAdmin,
  getAllOrders
);
// updateStatus
router.get("order/status/:userId", isSigned, isAuthenticated, getOrderStatus);
router.put(
  "order/:orderId/status/:userId",
  isSigned,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
