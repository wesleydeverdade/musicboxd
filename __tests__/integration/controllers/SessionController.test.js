import request from 'supertest';
import path from 'path';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Sessions', () => {
  beforeEach(async () => {
    await truncate();
  });
  // POST /sessions
  it('should be able to auth', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    expect(response.body).toHaveProperty('token');
  });
  it('should not be able to auth with different passwords', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const response = await request(app).post('/sessions').send({
      email: user.email,
      password: 'afsdfafafafa',
    });
    expect(response.status).toBe(401);
  });
  it('should not be able to auth with invalid user', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const response = await request(app).post('/sessions').send({
      email: 'wesleymagalhaes@bing.com.br',
      password: user.password,
    });
    expect(response.status).toBe(401);
  });
  it('should not be able to auth with invalid parameters', async () => {
    const response = await request(app).post('/sessions').send();
    expect(response.status).toBe(400);
  });
  // POST /forgot-password
  it('should be able to recover password', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const response = await request(app).post('/forgot-password').send({
      email: user.email,
    });
    expect(response.status).toBe(200);
  });
  it('should not be able to recover password with invalid user', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const response = await request(app).post('/forgot-password').send({
      email: 'wesleymagalhaes@bing.com.br',
      password: user.password,
    });
    expect(response.status).toBe(401);
  });
  it('should not be able to recover password with invalid parameters', async () => {
    const response = await request(app).post('/forgot-password').send();
    expect(response.status).toBe(400);
  });
  // POST /reset-password
  it('should be able to reset password', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const forgot_password = await request(app).post('/forgot-password').send({
      email: user.email,
    });
    const response = await request(app).post('/reset-password').send({
      token: forgot_password.body.token,
      email: user.email,
      password: '12345678',
    });
    expect(response.status).toBe(200);
  });
  it('should not be able to reset password', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    await request(app).post('/forgot-password').send({
      email: user.email,
    });
    const response = await request(app).post('/reset-password').send({
      token: '123123123',
      email: user.email,
      password: '1234567',
    });
    expect(response.status).toBe(401);
  });
  // POST /reset-password
  it('should not be able to reset password with password already used', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const forgot_password = await request(app).post('/forgot-password').send({
      email: user.email,
    });
    const response = await request(app).post('/reset-password').send({
      token: forgot_password.body.token,
      email: user.email,
      password: '123123',
    });
    expect(response.status).toBe(401);
  });
  it('should not be able to recover password with invalid parameters', async () => {
    const response = await request(app).post('/reset-password').send();
    expect(response.status).toBe(400);
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });
    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: '123123',
    });

    const { token } = sessions.body;
    const testImage = path.resolve(__dirname, '..', '..', 'factory-avatar.png');

    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', testImage, { contentType: 'application/octet-stream' });

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without token', async () => {
    const testImage = path.resolve(__dirname, '..', '..', 'factory-avatar.png');
    const response = await request(app)
      .post('/files')
      .attach('file', testImage, { contentType: 'application/octet-stream' });

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid token', async () => {
    const token = 'asdaf';
    const testImage = path.resolve(__dirname, '..', '..', 'factory-avatar.png');
    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', testImage, { contentType: 'application/octet-stream' });

    expect(response.status).toBe(401);
  });
});
