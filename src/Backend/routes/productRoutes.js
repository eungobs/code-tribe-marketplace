// routes/productRoutes.js
const express = require('express');
const { createProduct } = require('../controllers/productController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createProduct);
// Additional routes for updating, deleting, and listing products will go here.

module.exports = router;
