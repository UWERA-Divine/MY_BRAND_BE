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
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getBlogs = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const cloudimage_1 = __importDefault(require("../image/cloudimage"));
// import { request } from "http";
// import cloudimage from "../image/cloudimage";
// export const uploadImageToCloudinary = async (
//   imagePath: string
// ): Promise<string> => {
//   try {
//     const result = await cloudinary.v2.uploader.upload(imagePath);
//     return result.secure_url;
//   } catch (error) {
//     throw new Error("Error uploading image to Cloudinary");
//   }
// };
// export const uploadImageToCloudinary = async (
//   imagePath: string
// ): Promise<string> => {
//   try {
//     const result = await cloudinary.v2.uploader.upload(imagePath);
//     return result.secure_url;
//   } catch (error) {
//     throw new Error("Error uploading image to Cloudinary");
//   }
// };
// export const getMockBlogs = async (): Promise<any[]> => {
//   // Mock function to return an array of mock blogs
//   return [
//     { _id: "mockId1", title: "Mock Blog 1", content: "Mock content 1" },
//     { _id: "mockId2", title: "Mock Blog 2", content: "Mock content 2" },
//   ];
// };
// export const getMockBlogById = async (): Promise<any> => {
//   // Mock function to return a single mock blog by ID
//   return { _id: "mockId", title: "Mock Blog", content: "Mock content" };
// };
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        // const { error } = blogValidationSchema.validate({ title, content });
        // if (error) {
        //   return res.status(400).json({ error: error.details[0].message });
        // }
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
        res.status(201).send({ blog, message: "Blog created successfully!!" });
        // res.status(201).json(blog);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createBlog = createBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let posts;
        posts = yield Blog_1.default.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
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
