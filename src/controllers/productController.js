import cloudinary from 'cloudinary';
import Product from '../models/product.js';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const images = [];
  
  // Upload images to Cloudinary
  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path);
    images.push(result.secure_url);
  }

  const product = await Product.create({
    name,
    price,
    description,
    images,
    seller: req.user.id
  });

  res.status(201).json(product);
};

export const searchProducts = async (req, res) => {
  const { q } = req.query;
  const products = await Product.find({
    $text: { $search: q }
  });
  res.json(products);
};