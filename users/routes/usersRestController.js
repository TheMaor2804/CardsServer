const express = require("express");
const {
  registerUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
  validateRegistration,
  validateLogin,
} = require("../validation/userValidationService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (req.body.isAdmin) {
      return handleError(res, 403, "Authorization Error: You cannot register as Admin ");
    }
    const error = validateRegistration(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error}`);

    let user = await registerUser(req.body);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const error = validateLogin(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error}`);

    let { email, password } = req.body;
    const token = await loginUser(email, password);
    res.send(token);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;

    if (userInfo._id !== id && !userInfo.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user or admin can get user info"
      );
    }

    let user = await getUser(id);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Only admin can get all users"
      );
    }
    let users = await getUsers();
    res.send(users);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;
    const updatedUser = req.body;
    if (userInfo._id !== id && !userInfo.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user or admin can update user info"
      );
    }
    const error = userUpdateValidation(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error}`);
    let user = await updateUser(id, updatedUser);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

module.exports = router;
