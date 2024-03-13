import { Request, Response } from "express";
import Blog, {Iblog} from "../models/Blog";
import { Error } from "mongoose";
import cloudinary from "../image/cloudimage";
import { blogValidationSchema } from "../validators/BlogValidationSchema";
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

export const createBlog = async (req: Request, res: Response) => {
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
    const imageUrl = await cloudinary.uploader.upload(req.file.path);
    const blog = await Blog.create({
      title,
      content,
      imageUrl: imageUrl.secure_url,
    });

    res.status(201).send({ blog, message: "Blog created successfully!!" }); 
    // res.status(201).json(blog);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    let posts;
      posts = await Blog.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err: any) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(blog);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err: any) {
    res.status(500).json({ message: (err as Error).message });
  }
};
