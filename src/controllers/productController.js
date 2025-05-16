import cloudinary from '../config/cloudinary.js';
import Product from '../models/product.js';
import fs from 'fs/promises';

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const images = [];

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'Name and price are required' } });
    }

    // Validate images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: { code: 'NO_IMAGES', message: 'At least one image is required' } });
    }

    // Upload images to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      images.push(result.secure_url);
      await fs.unlink(file.path); // Clean up local file after upload
    }

    const product = await Product.create({
      name,
      price,
      description,
      images,
      seller: req.user.id
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err.message } });
  }
};

// Search Products
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    // If you want to use text search, make sure you have a text index on your Product model
    const products = await Product.find({
      $text: { $search: q }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err.message } });
  }
};
