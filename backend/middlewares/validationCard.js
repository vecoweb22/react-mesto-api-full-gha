const { Joi, celebrate } = require('celebrate');
const { URL_REG_EXP } = require('../utils/constants');

module.exports.validCardById = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().hex().required().length(24),
    }),
});

module.exports.validCreateCard = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().pattern(URL_REG_EXP),
    }),
});
