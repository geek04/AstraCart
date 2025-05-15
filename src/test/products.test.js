import request from 'supertest';
import app from '../src/app.js';
import Product from '../src/models/Product.js';
import { generateAuthToken } from '../src/utils/auth.js';

describe('Products API', () => {
  let token;

  beforeAll(async () => {
    // Create a test user and get JWT
    token = generateAuthToken({ id: 'test_user_id' });
  });

  it('should create a new product (admin only)', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Test Product')
      .field('price', 29.99)
      .attach('image', 'test/fixtures/test-product.jpg');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.images.length).toBe(1);
  });
});