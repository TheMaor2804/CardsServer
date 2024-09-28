const { generateAuthToken } = require("../../auth/providers/jwt");
const _ = require("lodash");
const User = require("./mongodb/User");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comaprePasswords } = require("../helpers/bcrypt");

const registerUser = async (newUser) => {
  try {
    newUser.password = generateUserPassword(newUser.password);
    let user = new User(newUser);
    user = await user.save();
    console.log(user);


    user = _.pick(user, ["name", "isBusiness", "phone", "email", "password", "address", "image"]);

    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getUser = async (userId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      const error = new Error("User with this id was not found");
      error.status = 404;
      return createError("Mongoose", error);
    }
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getUsers = async () => {
  try {
    let users = await User.find();
    if (!users) {
      const error = new Error("No users found");
      error.status = 404;
      return createError("Mongoose", error);
    }
    return users;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const loginUser = async (email, password) => {
  try {
    const userFromDb = await User.findOne({ email });

    if (!userFromDb) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      return createError("Authentication", error);
    }
    if (!comaprePasswords(password, userFromDb.password)) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      return createError("Authentication", error);
    }
    const token = generateAuthToken(userFromDb);
    return token;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const updateUser = async (userId, updatedUser) => {
  try {
    let user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
    if (!user) {
      const error = new Error("User with this id was not found");
      error.status = 404;
      return createError("Mongoose", error);
    }
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const changeBusinessStatus = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User with this id was not found");
      error.status = 404;
      return createError("Mongoose", error);
    }
    user.isBusiness = !user.isBusiness;
    await user.save();
    return user;
  } catch (error) {
    return createError("Mongoose", error);

  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      const error = new Error("User with this id was not found");
      error.status = 404;
      return createError("Mongoose", error);
    }
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};



module.exports = { registerUser, getUser, getUsers, loginUser, updateUser, changeBusinessStatus, deleteUser };
