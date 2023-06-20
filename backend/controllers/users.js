const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getFindUser = (id, res, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return next(err);
    });
};

module.exports.getUserById = (req, res, next) => getFindUser(req.params.userId, res, next);

const setUserData = (id, newData, res, next) => {
  User.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return setUserData(req.user._id, { name, about }, res, next);
};

module.exports.getCurrentUser = (req, res, next) => getFindUser(req.user._id, res, next);

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return setUserData(req.user._id, { avatar }, res, next);
};
