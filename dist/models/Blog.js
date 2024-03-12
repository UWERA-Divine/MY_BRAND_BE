"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Blog.ts
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    Id: {
        type: Number
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;
