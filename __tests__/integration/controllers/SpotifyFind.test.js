import request from 'supertest';
import app from '../../../src/app';

describe('Spotify', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
  });

  // GET find-album
  it('should be able to find an album by name', async () => {
    const response = await request(app).get('/find-album?album=nevermind');
    expect(response.body).toHaveProperty('albums');
  });
  it('should not be able to find album without parameters', async () => {
    const response = await request(app).get('/find-album?album=');
    expect(response.status).toBe(500);
  });
  it('should not be able to find album with invalid parameters', async () => {
    const response = await request(app).get(
      '/find-album?album=asdfasdfafsafaf'
    );
    expect(response.body.albums.total).toBe(0);
  });

  // GET get-album
  it('should be able to get information from album', async () => {
    const response = await request(app).get(
      '/get-album?id=04mkS7FooK8fRbB626T9NR'
    );
    expect(response.body).toHaveProperty('id');
  });
  it('should not be able to get information from album without id', async () => {
    const response = await request(app).get('/get-album?id=');
    expect(response.status).toBe(500);
  });
  it('should not be able to get information from album with invalid parameters', async () => {
    const response = await request(app).get(
      '/get-album?id=2guirTSEq%20LizK%207j9i1MTTZ'
    );
    expect(response.status).toBe(500);
  });

  // GET get-artist
  it('should be able to get information from artist', async () => {
    const response = await request(app).get(
      '/get-artist?id=6olE6TJLqED3rqDCT0FyPh'
    );
    expect(response.body).toHaveProperty('id');
  });
  it('should not be able to get information from artist without id', async () => {
    const response = await request(app).get('/get-artist?id=');
    expect(response.status).toBe(500);
  });
  it('should not be able to get information from artist with invalid parameters', async () => {
    const response = await request(app).get(
      '/get-artist?id=6olE6TJLqED3r%20qDCT0FyPh'
    );
    expect(response.status).toBe(500);
  });

  // AUTH FAIL
  it('should be able to auth on spotify API', async () => {
    process.env.SPOTIFY_CLIENT_ID = '';
    process.env.SPOTIFY_CLIENT_SECRET = '';
    const response = await request(app).get('/find-album?album=nevermind');
    expect(response.status).toBe(500);
  });
  // AUTH FAIL
  it('should be able to auth on spotify API when get album info', async () => {
    process.env.SPOTIFY_CLIENT_ID = '';
    process.env.SPOTIFY_CLIENT_SECRET = '';
    const response = await request(app).get(
      '/get-album?id=04mkS7FooK8fRbB626T9NR'
    );
    expect(response.status).toBe(500);
  });
  // AUTH FAIL
  it('should be able to auth on spotify API when get artist info', async () => {
    process.env.SPOTIFY_CLIENT_ID = '';
    process.env.SPOTIFY_CLIENT_SECRET = '';
    const response = await request(app).get(
      '/get-artist?id=6olE6TJLqED3rqDCT0FyPh'
    );
    expect(response.status).toBe(500);
  });
});
