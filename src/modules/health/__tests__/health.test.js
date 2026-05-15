import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../app.js';

describe('Health Check API', () => {
  it('GET /health deve retornar status 200 e mensagem de OK', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Server is running');
    expect(response.body).toHaveProperty('timeStamp');
  });
});
