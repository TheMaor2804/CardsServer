const express = require("express");
const chalk = require("chalk");
require("dotenv").config();
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const loggerMiddleware = require("./logger/loggerService");
const User = require("./users/models/mongodb/User");
const Card = require("./cards/models/mongodb/Card");
const { createInitialUsers, createInitialCards } = require("./initialData/initialDataService");

const app = express();
const PORT = process.env.PORT || 8181;

app.use(corsMiddleware);
app.use(express.json());

app.use(loggerMiddleware());

app.use(express.static("./public"));

app.use(router);

app.use((err, req, res, next) => {
  const message = err || "internal error of the server";
  return handleError(res, 500, message);
});

app.listen(PORT, async () => {
  console.log(chalk.yellow("app is listening to port " + PORT));
  await connectToDb();
  if (await User.countDocuments() === 0) {
    await createInitialUsers();
  }
  if (await Card.countDocuments() === 0) {
    await createInitialCards();
  }
});
