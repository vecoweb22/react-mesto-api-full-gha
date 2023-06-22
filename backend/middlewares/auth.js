const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/constants');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // if (!token) {
  //   return next(new AuthorizationError('Необходима авторизация.'));
  // }

  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
