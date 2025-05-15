import { addToCart, getCart } from '../services/redis.js';

export const addItem = async (req, res) => {
  const { productId, quantity } = req.body;
  await addToCart(req.user.id, productId, quantity);
  res.json({ message: 'Item added to cart' });
};

export const viewCart = async (req, res) => {
  const cart = await getCart(req.user.id);
  res.json(cart);
};