const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully".bgMagenta.blue.underline.bold);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message.red.bold);
  }
};

module.exports = connectDB;