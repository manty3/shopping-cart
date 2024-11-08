const mongoose = require("mongoose");
require("dotenv").config();

const state = {
  db: null,
};

const URL = process.env.MONGODB_URL_LOCAL;

const connect = async () => {
  try {
    console.log("MongoDB URL:", URL); // Check if URL is printed correctly
    const connection = await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    state.db = connection.connection.db;

    console.log("Database connection established using mongoose");
  } catch (err) {
    console.error(
      "Failed to connect to the database using mongoose. Error:",
      err
    );
  }
};

const get = () => {
  if (!state.db) {
    console.error("Error: Database not connected");
    throw new Error("Database not connected");
  }
  return state.db;
};

module.exports = {
  connect,
  get,
};
