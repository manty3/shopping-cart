const mongoose = require('mongoose');
require('dotenv').config();

const state = {

  db:null

  
};

// MongoDB connection string from environment variable


const URL= process.env.MONGODB_URL_LOCAL + "/shopping"


if (!URL) {
  console.error('MONGODB_URL_LOCAL environment variable is not set.');
  process.exit(1);
}

console.log("MongoDB URL:", URL);

// Function to establish MongoDB connection using mongoose
const connect = async () => {
  try {
    const connection = await mongoose.connect(URL);
    state.db = connection;
    
    console.log('Database connection established using mongoose');
  } catch (err) {
    console.error('Failed to connect to the database using mongoose. Error:', err);
  }
};

// Function to get the database instance
const get = () => state.db;

// Exporting functions
module.exports = {
  connect,
  get,
};
