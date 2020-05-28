import request from 'supertest';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import factory from '../../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  // POST METHOD

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });
    const compareHash = await user.checkPassword('12345678');
    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');
    const response = await request(app).post('/users').send(user);
    expect(response.body).toHaveProperty('id');
  });

  it('should note be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const response = await request(app).post('/users').send(user);
    expect(response.status).toBe(400);
  });

  it('should note be able to register with invalid avatar_id', async () => {
    const user = await factory.attrs('User', { avatar_id: 90329103 });
    const response = await request(app).post('/users').send(user);
    expect(response.status).toBe(400);
  });

  it('should note be able to register with invalid data', async () => {
    const response = await request(app).post('/users').send({
      username: 'wes',
      email: 'wes',
      password: '0000',
    });
    expect(response.status).toBe(400);
  });

  // PUT METHOD
  // DELETE METHOD
});
