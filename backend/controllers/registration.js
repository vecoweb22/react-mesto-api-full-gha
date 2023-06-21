const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { secretKey } = require('../utils/constants');
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
        email, password: hash, name, about, avatar,
      })
        .then((user) => {
          const noPassIdUser = user.toObject({ useProjection: true });
          return res.status(201).send(noPassIdUser);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Пользователь передал некорректные данные'));
          }
          if (err.code === 11000) {
            return next(new RegisterError('Пользователь уже зарегистрирован'));
          }
          return next(err);
        });
    });
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
            secretKey,
            { expiresIn: '7d' },
          );

          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            sameSite: 'none',
            secure: true,
            httpOnly: true,
          });

          return res.send(user.toJSON({ useProjection: true }));
        });
    })

    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  }).send({ message: 'Вы вышли' });
  res.end();
};
