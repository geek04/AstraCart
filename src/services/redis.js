import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not set in your environment variables.');
}

const client = redis.createClient({
  url: process.env.REDIS_URL // ONLY this line, no extra TLS/socket options!
});

client.connect().catch(console.error);

client.on('error', (err) => console.error('Redis error:', err));

export const addToCart = async (userId, productId, quantity) => {
  await client.hSet(`cart:${userId}`, productId, quantity);
};

export const getCart = async (userId) => {
  return await client.hGetAll(`cart:${userId}`);
};

export default client;
