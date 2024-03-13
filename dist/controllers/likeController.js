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
exports.deleteLike = exports.getLikes = exports.createLike = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
// export const createLike = async (req: Request, res: Response) => {
//   try {
//     const { like, blogId } = req.body;
//     const { error, value } = likeSchema.validate({ like, blogId });
//     if (error) {
//       throw new Error(error.details[0].message);
//     }
//     const likes = new Like({ like, blogId });
//     await likes.save();
//     res.status(201).json({ message: 'Like created successfully' });
//   } catch (error:any) {
//     res.status(400).json({ message: error.message });
// }
// };
// export const getLikes = async (req: Request, res: Response) => {
//   try {
//     const { blogId } = req.params; 
//     const likes = await Like.find({ blogId }); 
//     res.status(200).json({ likes });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// export const getLike= async (req: Request, res: Response) => {
//   try {
//     const  blogId  = req.params.id;
//     // const commentid=req.params.id;
//       const blog = await Like.find();
//       res.json(blog);
//   const comment = new Like({like:req.body.like,blogId:req.params.id  });
//   await comment.save();
//   } catch (err) {
//       res.status(500).json({ message: (err as Error).message });
//   }
// };
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const blog = yield Blog_1.default.findById(blogId);
    if (!blog) {
        res.status(400).send({ message: 'blog not found' });
    }
    if (blog) {
        blog.likes += 1;
    }
    yield (blog === null || blog === void 0 ? void 0 : blog.save());
    return res.status(200).json({ blog });
});
exports.createLike = createLike;
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield Blog_1.default.findOne({ _id: req.params.id });
    res.json({ likes: like === null || like === void 0 ? void 0 : like.likes });
});
exports.getLikes = getLikes;
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blog = yield Blog_1.default.findById(blogId);
        if (blog) {
            blog.likes--;
            blog.save();
            return res.status(200).send({ blog });
        }
    }
    catch (error) {
        res.status(500).send({ error: "Server error" });
    }
});
exports.deleteLike = deleteLike;
