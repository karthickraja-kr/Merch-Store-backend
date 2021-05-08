const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isSigned, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// create
router.post(
  "/category/create/:userId",
  isSigned,
  isAuthenticated,
  isAdmin,
  createCategory
);

// read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

//Update
router.put(
  "/category/:categoryId/:userId",
  isSigned,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete
router.delete(
  "/category/:categoryId/:userId",
  isSigned,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
