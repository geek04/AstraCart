import request from 'supertest';
import app from '../src/app.js';

describe('Error Handling', () => {
  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/nonexistent-route');
    expect(res.statusCode).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('should handle invalid JSON payloads', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send('invalid json');
    expect(res.statusCode).toBe(400);
    expect(res.body.error.code).toBe('INVALID_JSON');
  });
});