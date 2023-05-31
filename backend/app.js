const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_CONN } = require('./utils/constants');
const defaultError = require('./middlewares/defaultError');

const app = express();
app.use(express.json());
mongoose.connect(DB_CONN, {});
app.use('/', require('./routes/router'));

app.use(defaultError);

app.listen(PORT, () => {});
