import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/upload.js';
import {
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  updateProfileImage
} from '../controllers/userController.js';

const router = express.Router();

// Protected routes (require authentication)
router.get('/me', authMiddleware, getUser);
router.put('/me', authMiddleware, updateUser);
router.delete('/me', authMiddleware, deleteUser);
router.post('/change-password', authMiddleware, changePassword);
router.post('/profile-image', authMiddleware, upload.single('image'), updateProfileImage);

export default router;
