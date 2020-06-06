import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import File from '../src/app/models/File';
import Review from '../src/app/models/Review';

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

factory.define('Review', Review, {
  spotify_id: '04mkS7FooK8fRbB626T9NR',
  content: faker.lorem.sentences(),
  liked: faker.random.boolean(),
  note: 5,
  // tags: ['00s', 'Good'],
});

export default factory;
