const { env } = process;
let envFile = '.env';

if (env.NODE_ENV) {
  switch (env.NODE_ENV.toString().trim()) {
    case 'development':
      envFile = '.dev.env';
      break;
    case 'test':
      envFile = '.test.env';
      break;
    default:
      break;
  }
}
require('dotenv').config({ path: `./${envFile}`, silent: true });

module.exports = {
  host: env.HOST,
  httpPort: env.HTTP_PORT,
  mongodbUserUri: env.MONGODB_USER_URI,

  DB_USER_NAME: env.DB_USER_NAME,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_USER: env.DB_USER
};
