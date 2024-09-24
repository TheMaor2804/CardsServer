const mongoose = require("mongoose");
const { URL, ALT } = require("./mongooseValidators");

const Image = new mongoose.Schema({
  url: URL,
  alt: ALT,
});

module.exports = Image;
