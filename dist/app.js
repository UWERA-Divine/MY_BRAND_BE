"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const likeRoutes_1 = __importDefault(require("./routes/likeRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const dbURI = "mongodb+srv://DivineBeulla:mongo12345678@cluster0.h2wtlww.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
app.use("/api/blogs", blogRoutes_1.default);
app.use("/api/blogs", commentRoutes_1.default);
app.use("/api/messages", messageRoutes_1.default);
app.use("/api/blogs", likeRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;