const mongoose = require("mongoose");

const url = process.env.MONGO_URL
const connection = mongoose.connect(url);

module.exports = connection;
