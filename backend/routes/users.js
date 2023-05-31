const userRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const { validGetUserById, validUpdateUser, validUpdateAvatar } = require('../middlewares/validationUser');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validGetUserById, getUserById);
userRouter.patch('/me', validUpdateUser, updateUser);
userRouter.patch('/me/avatar', validUpdateAvatar, updateAvatar);

module.exports = userRouter;
