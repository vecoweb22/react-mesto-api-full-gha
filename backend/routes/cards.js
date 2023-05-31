const cardRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  addLikeCard,
  deleteLikeCard,
  deleteCard,
} = require('../controllers/cards');

const { validCreateCard, validCardById } = require('../middlewares/validationCard');

cardRouter.get('/', getAllCards);
cardRouter.post('/', validCreateCard, createCard);
cardRouter.put('/:cardId/likes', validCardById, addLikeCard);
cardRouter.delete('/:cardId/likes', validCardById, deleteLikeCard);
cardRouter.delete('/:cardId', validCardById, deleteCard);

module.exports = cardRouter;
