// src/app.ts
import express from "express";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes";
import commentRoutes from "./routes/commentRoutes";
import messageRoutes from "./routes/messageRoutes";
import likeRoutes from "./routes/likeRoutes";
import cloudinary from "cloudinary";
import * as swaggerDocument from "./swagger.json";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
const app = express();

app.use(express.json());

const dbURI =
  "mongodb+srv://DivineBeulla:mongo12345678@cluster0.h2wtlww.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } as any)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/blogs", blogRoutes);
app.use("/api/blogs", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/blogs", likeRoutes);
app.use('/docs', swaggerUI.serve,swaggerUI.setup(swaggerDocument))
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
