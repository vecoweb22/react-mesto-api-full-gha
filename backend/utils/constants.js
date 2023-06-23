require('dotenv').config();

const URL_REG_EXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const {
  NODE_ENV,
  JWT_SECRET,
  PORT = 3000,
  DB_URI = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  URL_REG_EXP,
  PORT,
  DB_URI,
  secretKey,
};
