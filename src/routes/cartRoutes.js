import express from 'express';
import { addItem, viewCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addItem);
router.get('/', authMiddleware, viewCart);

export default router;