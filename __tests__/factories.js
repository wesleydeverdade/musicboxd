import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import File from '../src/app/models/File';
import Review from '../src/app/models/Review';
import List from '../src/app/models/List';
import Album from '../src/app/models/Album';

factory.define('User', User, {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('File', File, {
  file: faker.image.avatar(),
});

factory.define('UserUpdate', User, {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  location: faker.address.country(),
  website: faker.internet.url(),
  bio: faker.lorem.sentences(),
  people_section: faker.random.boolean(),
  first_favorite_album: '2guirTSEqLizK7j9i1MTTZ',
  second_favorite_album: '0YF8PfcGbsKg5IaFyPnlyY',
  third_favorite_album: '0ZV52q6eXsblxz89BbCL5H',
  fourth_favorite_album: '0QMVSKhzT4u2DEd8qdlz4I',
  fifth_favorite_album: '04mkS7FooK8fRbB626T9NR',
  replies: 1,
});

// spotify ids
// "2guirTSEqLizK7j9i1MTTZ", "0YF8PfcGbsKg5IaFyPnlyY", "0ZV52q6eXsblxz89BbCL5H"
// "0QMVSKhzT4u2DEd8qdlz4I", "04mkS7FooK8fRbB626T9NR", "002IhaQrqlVoyLhsTlzLd8"
// "1Mdy7hhoQRYdVrHzYnlUee", "28yHV3Gdg30AiB8h8em1eW"

factory.define('Album', Album, {
  // spotify_id: '',
  album_name: faker.lorem.words(),
  album_artists: {},
  album_release_date: new Date(),
  album_genres: {},
});

factory.define('Review', Review, {
  spotify_id: '04mkS7FooK8fRbB626T9NR',
  content: faker.lorem.sentences(),
  liked: faker.random.boolean(),
  note: 5,
  // tags: [faker.lorem.words(), faker.lorem.words()],
});

factory.define('List', List, {
  name: faker.lorem.words(),
  description: faker.lorem.sentences(),
  public_list: faker.random.boolean(),
  ranked_list: faker.random.boolean(),
  // tags: [faker.lorem.words()],
  albums: [
    { spotify_id: '04mkS7FooK8fRbB626T9NR', note: faker.lorem.sentences() },
    { spotify_id: '2guirTSEqLizK7j9i1MTTZ', note: faker.lorem.sentences() },
    { spotify_id: '0ZV52q6eXsblxz89BbCL5H', note: faker.lorem.sentences() },
    { spotify_id: '0QMVSKhzT4u2DEd8qdlz4I', note: faker.lorem.sentences() },
    { spotify_id: '002IhaQrqlVoyLhsTlzLd8', note: faker.lorem.sentences() },
  ],
});

export default factory;
