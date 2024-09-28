const registerValidation = require("./Joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");

const config = require("config");
const userUpdateValidation = require("./Joi/userUpdateValidation");
const validator = config.get("VALIDATOR");

const validateRegistration = (user) => {
  if (validator === "joi") {
    const { error } = registerValidation(user);
    if (error) return error.details[0].message;
    return "";
  }
};
const validateUserUpdate = (user) => {
  if (validator === "joi") {
    const { error } = userUpdateValidation(user);
    if (error) return error.details[0].message;
    return "";
  }
};

const validateLogin = (user) => {
  if (validator === "joi") {
    const { error } = loginValidation(user);
    if (error) return error.details[0].message;
    return "";
  }
};

module.exports = { validateRegistration, validateUserUpdate, validateLogin };
