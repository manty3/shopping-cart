const mongoose = require("mongoose");
require("dotenv").config();

const state = {
  db: null,
};

const URL = process.env.MONGODB_URL_LOCAL;

const connect = async () => {
  try {
    console.log("MongoDB URL:", URL);
    const connection = await mongoose.connect(URL);
    state.db = connection.connection.db; // <-- Add this line to correctly set the db object

    console.log("Database connection established using mongoose");
  } catch (err) {
    console.error(
      "Failed to connect to the database using mongoose. Error:",
      err
    );
  }
};

const get = () => state.db;

module.exports = {
  connect,
  get,
};
