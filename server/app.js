require("dotenv").config();
require("colors");

const express = require("express");
const app = express();
const connectDB = require("./db/database")
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {requireLogin} = require("./middlewares/auth")
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");


const PORT = process.env.PORT || 3000;
connectDB();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo",requireLogin, todoRoute);







app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`.yellow.bold.underline.bgBlue
  );
});