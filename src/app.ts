// src/app.ts
import express from "express";
import blogRoutes from "./routes/blogRoutes";
import commentRoutes from "./routes/commentRoutes";
import messageRoutes from "./routes/messageRoutes";
import likeRoutes from "./routes/likeRoutes";
import userroutes from "./routes/userroutes";
import cloudinary from "cloudinary";
import * as swaggerDocument from "./swagger.json";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/blogs", blogRoutes);
app.use("/api/blogs", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/blogs", likeRoutes);
app.use("/api/users", userroutes)
app.use('/docs', swaggerUI.serve,swaggerUI.setup(swaggerDocument))

export default app;
