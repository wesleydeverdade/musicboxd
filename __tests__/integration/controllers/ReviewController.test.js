import request from 'supertest';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import jwt from '../../util/token';
import factory from '../../factories';

let token = '';

describe('Reviews', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    token = await jwt();
  });
  afterAll(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const review = await factory.attrs('Review', { tags: ['00s'] });
    const response = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(response.body).toHaveProperty('review');
  });

  it('should not be able to register with invalid data', async () => {
    const review = {
      spotify_id: 333,
      content: 'Awesome',
      liked: 1,
      note: 20,
    };
    const response = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid album id', async () => {
    const review = await factory.attrs('Review', { spotify_id: 'asdaf0123' });
    const response = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(response.status).toBe(400);
  });

  it('should not be able to register a duplicate entry', async () => {
    const review = await factory.attrs('Review', {
      spotify_id: '0QMVSKhzT4u2DEd8qdlz4I',
    });

    await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    const response = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(response.status).toBe(400);
  });

  it('should be able to update review', async () => {
    const review = await factory.attrs('Review', {
      spotify_id: '2guirTSEqLizK7j9i1MTTZ',
      tags: ['heavy'],
    });
    const created_review = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    const response = await request(app)
      .put(`/reviews/${created_review.body.review.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(response.body).toHaveProperty('review');
  });

  it('should not be able to update review with invalid data', async () => {
    const review = await factory.attrs('Review', {
      spotify_id: '28yHV3Gdg30AiB8h8em1eW',
    });
    const created_review = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    const response = await request(app)
      .put(`/reviews/${created_review.body.review.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        spotify_id: 333,
        content: 'Awesome',
        liked: 1,
        note: 20,
      });

    expect(response.status).toBe(400);
  });

  it('should be able to delete review', async () => {
    const review = await factory.attrs('Review', {
      spotify_id: '002IhaQrqlVoyLhsTlzLd8',
    });
    const created_review = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    const response = await request(app)
      .delete(`/reviews/${created_review.body.review.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to delete invalid review', async () => {
    const response = await request(app)
      .delete(`/reviews/123`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it('should not be able to update review if user are not the owner', async () => {
    const review = await factory.attrs('Review', {
      spotify_id: '1Mdy7hhoQRYdVrHzYnlUee',
    });
    const created_review = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    const review_id = created_review.body.review.id;

    const user = await factory.create('User', {
      username: 'test',
      email: 'test@email.com',
      password: '123123',
    });
    const session = await request(app).post('/sessions').send({
      email: user.email,
      password: user.password,
    });
    const token_new_user = session.body.token;

    const response = await request(app)
      .put(`/reviews/${review_id}`)
      .set('Authorization', `Bearer ${token_new_user}`)
      .send(review);

    expect(response.status).toBe(400);
  });
});
