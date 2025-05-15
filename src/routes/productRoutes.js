import express from 'express';
import { createProduct, searchProducts } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createProduct);
router.get('/search', searchProducts);

export default router;