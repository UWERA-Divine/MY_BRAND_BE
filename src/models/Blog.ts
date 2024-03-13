// src/models/Blog.ts
import { Schema, model } from "mongoose";

export interface  Iblog{
  Id: Number,
  title:string,
  content:string,
  imageUrl:string,
  likes:number,
  createdAt:Date,
}
const blogSchema = new Schema<Iblog>({
  Id: {
    type:Number
  },
  title:{
    type:String
  },
  content:{ 
    type:String
  },
  imageUrl: {
    type:String
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = model<Iblog>("Blog", blogSchema)
export default Blog;
