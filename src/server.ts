import dotenv from "dotenv";
import app from "./app";
import Database from "./config/db";
dotenv.config();
Database();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});