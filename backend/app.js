const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const defaultError = require('./middlewares/defaultError');
const { PORT, DB_URI } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCorsOrigins } = require('./middlewares/corsWare');

const app = express();

const corsOptions = {
  origin: allowedCorsOrigins,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());

mongoose.connect(DB_URI, {});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/', require('./routes/router'));

app.use(errorLogger);

app.use(errors({ message: 'Ошибка валидации' }));

app.use(defaultError);

app.listen(PORT, () => { });
