import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongodb = process.env.DATABASE_URI || "";
const Database = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb+srv://DivineBeulla:mongo12345678@cluster0.h2wtlww.mongodb.net/?retryWrites=true&w=majority");
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
export default Database;