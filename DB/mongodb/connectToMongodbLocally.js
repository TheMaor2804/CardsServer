const mongoose = require("mongoose");
const User = require("../../users/models/mongodb/User");
const { createInitialUsers, createInitialCards } = require("../../initialData/initialDataService");
const Card = require("../../cards/models/mongodb/Card");
const chalk = require("chalk");


const connectToLocalDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/maorCardsServer");
    console.log("Connected to MongoDB locally");
    if (await User.countDocuments() === 0) {
      await createInitialUsers();
      console.log(chalk.green("Initial users created"));
    }
    if (await Card.countDocuments() === 0) {
      await createInitialCards();
      console.log(chalk.green("Initial cards created"));
    }
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
};

module.exports = connectToLocalDb;
