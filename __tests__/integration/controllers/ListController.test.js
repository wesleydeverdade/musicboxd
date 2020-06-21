import request from 'supertest';
import app from '../../../src/app';
import truncate from '../../util/truncate';
import jwt from '../../util/token';
import factory from '../../factories';

let token = '';

describe('Lists', () => {
  beforeAll(async () => {
    token = await jwt();
    await factory.create('Album', { spotify_id: '2guirTSEqLizK7j9i1MTTZ' });
    await factory.create('Album', { spotify_id: '0YF8PfcGbsKg5IaFyPnlyY' });
    await factory.create('Album', { spotify_id: '0ZV52q6eXsblxz89BbCL5H' });
    await factory.create('Album', { spotify_id: '0QMVSKhzT4u2DEd8qdlz4I' });
    await factory.create('Album', { spotify_id: '04mkS7FooK8fRbB626T9NR' });
    await factory.create('Album', { spotify_id: '002IhaQrqlVoyLhsTlzLd8' });
    await factory.create('Album', { spotify_id: '1Mdy7hhoQRYdVrHzYnlUee' });
    await factory.create('Album', { spotify_id: '28yHV3Gdg30AiB8h8em1eW' });
  });

  afterAll(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const list = await factory.attrs('List');
    const response = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send(list);

    expect(response.body).toHaveProperty('id');
  });

  // it('should be able to delete list', async () => {
  //   const list = await factory.attrs('List', {
  //     albums: [{ spotify_id: '04mkS7FooK8fRbB626T9NR' }],
  //   });

  //   const created_list = await request(app)
  //     .post('/lists')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(list);

  //   const response = await request(app)
  //     .delete(`/lists/${created_list.body.id}`)
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(response.status).toBe(200);
  // });

  // it('should not be able to delete invalid list', async () => {
  //   const response = await request(app)
  //     .delete(`/lists/123`)
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(response.status).toBe(401);
  // });
});
