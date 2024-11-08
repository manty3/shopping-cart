const mongoose = require("mongoose");
require("dotenv").config();

const state = {
  db: null,
};

// Use a hardcoded URL temporarily to bypass environment variable issues
const URL = process.env.MONGODB_URL_LOCAL || "mongodb+srv://akshaymadathil3:aypI2XNeo4SlDsP9awebapp.x9sdfh3.mongodb.net/shopping?retryWrites=true&w=majority";

const connect = async () => {
  try {
    console.log("Attempting to connect to MongoDB with URL:", URL);
    const connection = await mongoose.connect(URL);  // Remove deprecated options
    state.db = connection.connection.db;

    console.log("Database connection established using mongoose");
  } catch (err) {
    console.error("Failed to connect to the database using mongoose. Error:", err);
  }
};

const get = () => {
  if (!state.db) {
    console.error("Error: Database not connected. state.db is null.");
    throw new Error("Database not connected");
  }
  return state.db;
};

module.exports = {
  connect,
  get,
};
