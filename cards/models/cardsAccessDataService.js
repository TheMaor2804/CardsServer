const { createError, handleError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");
const _ = require("lodash");
const config = require("config");
const DB = config.get("DB");

const validateDB = () => {
  if (DB !== 'mongodb') {
    const error = new Error('There is no valid database selected to perform this operation');
    error.status = 500;
    throw createError("DB", error);
  }
};

const createCard = async (newCard) => {
  validateDB();
  try {
    let card = new Card(newCard);
    card = await card.save();
    return card;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getCards = async () => {
  validateDB();
  try {
    let cards = await Card.find();
    return cards;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getCard = async (cardId) => {
  validateDB();
  try {
    let card = await Card.findById(cardId);
    return card;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getMyCards = async (userId) => {
  validateDB();
  try {
    let cards = await Card.find({ user_id: userId });
    return cards;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const updateCard = async (cardId, newCard) => {
  validateDB();
  try {
    let card = await Card.findByIdAndUpdate(cardId, newCard, { new: true });
    return card;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const deleteCard = async (cardId) => {
  validateDB();
  try {
    let card = await Card.findByIdAndDelete(cardId);
    return card;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const likeCard = async (cardId, userId) => {
  validateDB();
  try {
    let card = await Card.findById(cardId);
    if (!card) {
      return card;
    }
    if (card.likes.includes(userId)) {
      let newLikesArray = card.likes.filter((id) => id != userId);
      card.likes = newLikesArray;
    } else {
      card.likes.push(userId);
    }
    await card.save();
    return card;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

module.exports = {
  createCard,
  getCards,
  getCard,
  getMyCards,
  updateCard,
  deleteCard,
  likeCard,
};
