const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ['Electronics', 'Fashion', 'Books'] },
  stock: { type: Number, default: 0 },
  images: [String], // Cloudinary URLs
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});