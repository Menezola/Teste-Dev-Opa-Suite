const express = require("express");
const {
  createProduct,
  getProducts,
} = require("../controllers/productController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);

module.exports = router;