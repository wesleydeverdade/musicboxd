import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

export default async function token() {
  const user = await factory.create('User', {
    password: '123123',
  });
  const response = await request(app).post('/sessions').send({
    email: user.email,
    password: user.password,
  });
  return response.body.token;
}
