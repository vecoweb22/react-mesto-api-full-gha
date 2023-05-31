const JWT_SECRET = 'c7d13632d38f2f55e1dd7cdc5f50e925cd86c2db1b890c2f8561c9012dde29cf';

const URL_REG_EXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const { PORT = 3000, DB_CONN = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  JWT_SECRET,
  URL_REG_EXP,
  PORT,
  DB_CONN,
};
