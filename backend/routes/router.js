const router = require('express').Router();
const { errors } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/registration');
const { validCreateUser, validLogin } = require('../middlewares/validationUser');

router.post('/signin', validLogin, login);
router.post('/signup', validCreateUser, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Данная страница не существует')));
router.use(errors({ message: 'Ошибка валидации' }));

module.exports = router;
