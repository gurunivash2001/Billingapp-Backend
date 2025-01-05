const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.post('/', async (req, res) => {
    try {
      const { name, price, quantity } = req.body;
      const product = new Product({ name, price, quantity });
      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  });
  

 
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

 
router.put('/:id', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, quantity }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

 
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

module.exports = router;
