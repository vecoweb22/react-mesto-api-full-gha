const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const { createUser, login, logout } = require('../controllers/registration');
const { validCreateUser, validLogin } = require('../middlewares/validationUser');

router.post('/signin', validLogin, login);
router.post('/signup', validCreateUser, createUser);
router.get('/signout', logout);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Данная страница не существует')));

module.exports = router;
