import redis from 'redis';

const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => console.error('Redis error:', err));

export const addToCart = async (userId, productId, quantity) => {
  await client.hSet(`cart:${userId}`, productId, quantity);
};

export const getCart = async (userId) => {
  return await client.hGetAll(`cart:${userId}`);
};