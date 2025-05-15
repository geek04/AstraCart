// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// Import at the top
import authRoutes from './routes/authRoutes.js';
import { apiLimiter } from './middlewares/rateLimiter.js'; // Import rate limiter
import { errorHandler } from './middlewares/errorHandler.js'; // Import error handler

// Routes
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';


// Import other routes as needed



// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Rate Limiter (BEFORE routes)
app.use('/api/', apiLimiter); // Apply to all /api/* routes


// Add after middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use(errorHandler);
// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB ✅'))
  .catch(err => console.error('MongoDB connection failed ❌', err));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`AstraCart backend running on port ${PORT} 🚀`);
});