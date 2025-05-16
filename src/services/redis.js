import redis from 'redis';

// Ensure REDIS_URL is set
if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not set in your environment variables.');
}

const client = redis.createClient({
  url: process.env.REDIS_URL
});

// Connect the client as soon as the module is loaded
client.connect().catch(console.error);

client.on('error', (err) => console.error('Redis error:', err));

// Add item to cart
export const addToCart = async (userId, productId, quantity) => {
  await client.hSet(`cart:${userId}`, productId, quantity);
};

// Get all items in cart
export const getCart = async (userId) => {
  return await client.hGetAll(`cart:${userId}`);
};

// (Optional) Export the client if needed elsewhere
export default client;
