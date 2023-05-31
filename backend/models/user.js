const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { URL_REG_EXP } = require('../utils/constants');
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректная электронная почта',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },

    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },

    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (avatar) => URL_REG_EXP.test(avatar),
        message: 'Некорректный адрес URL',
      },
    },
  },
  {
    versionKey: false,
    toJSON: {
      useProjection: true,
    },
    toObject: {
      useProjection: true,
    },
  },
);

userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError('Некорректные почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError('Некорректные почта или пароль'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
