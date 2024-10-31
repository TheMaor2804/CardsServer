const { generateAuthToken } = require("../../auth/providers/jwt");
const _ = require("lodash");
const User = require("./mongodb/User");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePasswords } = require("../helpers/bcrypt");
const config = require("config");
const DB = config.get("DB");

const validateDB = () => {
  if (DB !== 'mongodb') {
    const error = new Error('There is no valid database selected to perform this operation');
    error.status = 500;
    throw createError("DB", error);
  }
};

const registerUser = async (newUser) => {
  validateDB();
  try {
    newUser.password = generateUserPassword(newUser.password);
    let user = new User(newUser);
    user = await user.save();
    user = _.pick(user, ['name', 'email', "_id"]);
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getUser = async (userId) => {
  validateDB();
  try {
    let user = await User.findById(userId).select({ password: 0, __v: 0 });
    if (!user) {
      const error = new Error("User with this id was not found");
      error.status = 404;
      throw error;
    }
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getUsers = async () => {
  validateDB();
  try {
    let users = await User.find().select({ password: 0, __v: 0 });
    return users;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const loginUser = async (email, password) => {
  validateDB();
  try {
    const userFromDb = await User.findOne({ email });
    if (!userFromDb) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      error.name = "Authentication";
      throw error;
    }
    if (!comparePasswords(password, userFromDb.password)) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      error.name = "Authentication";
      throw error;
    }
    const token = generateAuthToken(userFromDb);
    return token;
  } catch (error) {
    return createError(error.name, error);
  }
};

const updateUser = async (userId, updatedUser) => {
  validateDB();
  try {
    let user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
    if (!user) {
      const error = new Error("User with this id was not found");
      error.status = 404;
      error.name = "Internal";
      throw error;
    }
    return user;
  } catch (error) {
    return createError(error.name, error);
  }
};

const changeBusinessStatus = async (userId) => {
  validateDB();
  try {
    const user = await User.findById(userId).select({ password: 0, __v: 0 });
    user.isBusiness = !user.isBusiness;
    await user.save();
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const deleteUser = async (userId) => {
  validateDB();
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      const error = new Error("User with this id was not found");
      error.status = 404;
      error.name = "Internal";
      throw error;
    }
    return user;
  } catch (error) {
    return createError(error.name, error);
  }
};

module.exports = { registerUser, getUser, getUsers, loginUser, updateUser, changeBusinessStatus, deleteUser };
