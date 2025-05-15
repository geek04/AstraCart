import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';

describe('Auth API', () => {
  // Clear DB before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@astracart.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject duplicate email registration', async () => {
    // First registration
    await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@astracart.com',
      password: 'password123'
    });

    // Second registration with same email
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User 2',
        email: 'test@astracart.com',
        password: 'password456'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error.code).toBe('DUPLICATE_EMAIL');
  });
});