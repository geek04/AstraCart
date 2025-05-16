import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user.js';

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: { code: 'DUPLICATE_EMAIL', message: 'Email is already registered' }
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    // Send response
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });
  } catch (err) {
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: err.message }
    });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    // Send response
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: err.message }
    });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // Send email with reset link (pseudo code)
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Password Reset',
    //   text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    // });
    res.json({
      message: 'Password reset link sent to your email'
    });
  } catch (err) {
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: err.message }
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Find user by reset token and check expiry
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(404).json({
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
      });
    }
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    res.json({
      message: 'Password reset successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: err.message }
    });
  }
};
