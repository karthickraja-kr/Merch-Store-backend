const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllCategories,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSigned, isAdmin, isAuthenticated } = require("../controllers/auth");

// Params
router.param("userId", getUserById);
router.param("productId", getProductById);

// routes
// Create
router.post(
  "/product/create/:userId",
  isSigned,
  isAuthenticated,
  isAdmin,
  createProduct
);

// Read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Delete
router.delete(
  "/product/:productId/:userId",
  isSigned,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// update
router.put(
  "/product/:productId/:userId",
  isSigned,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// listing
router.get("/products", getAllProducts);
router.get("/products/categories", getAllCategories);

module.exports = router;
