import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);