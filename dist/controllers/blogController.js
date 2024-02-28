"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getBlogs = exports.createBlog = exports.uploadImageToCloudinary = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const mongoose_1 = require("mongoose");
const cloudinary_1 = __importDefault(require("cloudinary"));
const BlogValidationSchema_1 = require("../validators/BlogValidationSchema");
// import { request } from "http";
const cloudimage_1 = __importDefault(require("../image/cloudimage"));
const uploadImageToCloudinary = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.default.v2.uploader.upload(imagePath);
        return result.secure_url;
    }
    catch (error) {
        throw new mongoose_1.Error("Error uploading image to Cloudinary");
    }
});
exports.uploadImageToCloudinary = uploadImageToCloudinary;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const { error } = BlogValidationSchema_1.blogValidationSchema.validate({ title, content });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        // const imagePath = req.file ? req.file.path : undefined;
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }
        const imageUrl = yield cloudimage_1.default.uploader.upload(req.file.path);
        const blog = yield Blog_1.default.create({
            title,
            content,
            imageUrl: imageUrl.secure_url,
        });
        res.status(201).json(blog);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createBlog = createBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield Blog_1.default.find();
        res.json(blogs);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getBlogs = getBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getBlogById = getBlogById;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield Blog_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(blog);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Blog_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteBlog = deleteBlog;