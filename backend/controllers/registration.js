const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const RegisterError = require('../errors/RegisterError');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, about, avatar, password,
  } = req.body;

  bcrypt.hash(password, 15)
    .then((hash) => {
      User.create({
        name, email, about, password: hash, avatar,
      })
        .then(() => res.status(201)
          .send(
            {
              data: {
                name,
                email,
                about,
                avatar,
              },
            },
          ))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Пользователь передал некорректные данные'));
          }
          if (err.code === 11000) {
            return next(new RegisterError('Пользователь с указанным e-mail уже зарегистрирован'));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthorizationError('Неправильные почта или пароль.'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AuthorizationError('Неправильные почта или пароль.'));
          }

          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );

          return res.send({ token });
        });
    })

    .catch(next);
};
