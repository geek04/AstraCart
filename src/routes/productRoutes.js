import express from 'express';
import { createProduct, searchProducts } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router(); // Define the router FIRST

// Route for creating a product with image upload
router.post('/', authMiddleware, upload.array('images'), createProduct);

// Route for searching products
router.get('/search', searchProducts);

export default router;
