import request from 'supertest';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import factory from '../../factories';

describe('User', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
  });

  beforeEach(async () => {
    await truncate();
  });

  // POST METHOD

  it('should encrypt user password when new user created', async () => {
    jest.setTimeout(30000);
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

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');
    await request(app).post('/users').send(user);
    const response = await request(app).post('/users').send(user);
    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid avatar_id', async () => {
    const user = await factory.attrs('User', { avatar_id: 90329103 });
    const response = await request(app).post('/users').send(user);
    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid data', async () => {
    const response = await request(app).post('/users').send({
      username: 'wes',
      email: 'wes',
      password: '0000',
    });
    expect(response.status).toBe(400);
  });

  // PUT METHOD
  it('should be able to edit user', async () => {
    const user = await factory.attrs('UserUpdate', {
      password: '12345678',
      oldPassword: '12345678',
      confirmPassword: '12345678',
    });
    await request(app).post('/users').send(user);

    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;

    const response = await request(app)
      .put('/users')
      .send(user)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to edit user if e-mail was used', async () => {
    const anotherUser = await factory.create('User', {
      password: '12345678',
    });

    const user = await factory.attrs('UserUpdate', {
      password: '12345678',
      oldPassword: '12345678',
      confirmPassword: '12345678',
    });
    await request(app).post('/users').send(user);

    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;

    user.email = anotherUser.email;

    const response = await request(app)
      .put('/users')
      .send(user)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to edit user with wrong password', async () => {
    const user = await factory.attrs('UserUpdate', {
      password: '12345678',
      oldPassword: '12345678',
      confirmPassword: '12345678',
    });
    await request(app).post('/users').send(user);

    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;
    user.oldPassword = 'asdaf123';

    const response = await request(app)
      .put('/users')
      .send(user)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it('should not be able to edit user if username was used', async () => {
    const anotherUser = await factory.create('User', {
      password: '12345678',
    });

    const user = await factory.attrs('UserUpdate', {
      password: '12345678',
      oldPassword: '12345678',
      confirmPassword: '12345678',
    });
    await request(app).post('/users').send(user);

    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;

    user.username = anotherUser.username;

    const response = await request(app)
      .put('/users')
      .send(user)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to edit user if the avatar_id not exists', async () => {
    const user = await factory.attrs('UserUpdate', {
      password: '12345678',
      oldPassword: '12345678',
      confirmPassword: '12345678',
    });
    await request(app).post('/users').send(user);

    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;
    user.avatar_id = 90329103;
    const response = await request(app)
      .put('/users')
      .send(user)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid data', async () => {
    const user = await factory.attrs('UserUpdate', {
      password: '12345678',
      oldPassword: '12345678',
      confirmPassword: '12345678',
    });
    await request(app).post('/users').send(user);

    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;

    const response = await request(app)
      .put('/users')
      .send()
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  // DELETE METHOD
  it('should be able to delete user', async () => {
    const user = await factory.create('User');
    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;

    const response = await request(app)
      .delete('/users')
      .send({
        password: user.password,
        confirmPassword: user.password,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete user with different passwords', async () => {
    const user = await factory.create('User');
    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;

    const response = await request(app)
      .delete('/users')
      .send({
        password: user.password,
        confirmPassword: 'asdaf',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to delete user with wrong passwords', async () => {
    const user = await factory.create('User');
    const sessions = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const { token } = sessions.body;

    const response = await request(app)
      .delete('/users')
      .send({
        password: 'asdaf',
        confirmPassword: 'asdaf',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
});
