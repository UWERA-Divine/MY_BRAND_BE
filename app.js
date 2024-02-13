const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// custom modules

// const { createBlog } = require("./blogController");
const router = require("./routers");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(morgan("dev"));
const DB_URI = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const blogController = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "blogs",
  });
  next();
};
mongoose
  .connect(DB_URI)
  .then(() => console.log(" DB connected successfuly"))
  .catch((err) => console.log("Error😒", err));

app.use("/api/blogs", router);

app.listen(PORT, () => {
  console.log(`App running on: ${PORT} ...`);
});
