const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
const { isSigned, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userid", getUserById);
router.get("/user/:userid", isSigned, isAuthenticated, getUser);
router.put("/user/:userid", isSigned, isAuthenticated, updateUser);

router.get("/orders/user/:userid", isSigned, isAuthenticated, userPurchaseList);

module.exports = router;
