import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [{
    street: String,
    city: String,
    country: String
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);