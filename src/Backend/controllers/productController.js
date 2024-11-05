// controllers/productController.js
const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const product = new Product({ name, description, price, quantity, seller: req.user.id });

  try {
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Additional CRUD operations like update, delete, and listing will go here.
