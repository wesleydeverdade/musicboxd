import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import File from '../src/app/models/File';

factory.define('User', User, {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('File', File, {
  file: faker.image.avatar(),
});

export default factory;
