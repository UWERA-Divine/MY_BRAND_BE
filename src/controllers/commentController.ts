

import { Request, Response } from 'express';
import Comment from '../models/Comment';
import { commentSchema } from '../validators/commentValidators';

interface IReqBodyComment extends Request {
  body: {
    name: string;
    comment: string;
  };
  params: {
    id: string;
  };
}

class CustomResponse {
  private req: Request;
  private res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  send<T>(data: T, message: string, status: number) {
    return this.res.status(status).json({
      data,
      message
    });
  }
}

const error = (error: any, res: Response) => {
  console.log(error);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    // Handle the case where the provided ID is invalid (not a valid ObjectId)
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  res.status(500).json({ message: 'Internal server error' });
};

export { error };

export const CreateComment = async (req: IReqBodyComment, res: Response) => {
  const response = new CustomResponse(req, res);
  try {
    const { error, value } = commentSchema.validate(req.body);

    if (error) {
      return response.send(null, error.message, 400);
    }

    const { name, email, comment } = value;
    const { id: blogId } = req.params;
    const newComment = new Comment({
      name,
      comment,
      blogId,
      date: new Date(),
    });
    const savedComment = await newComment.save();
    response.send<typeof savedComment>(
      savedComment,
      'Comment Created Successfully',
      201,
    );
  } catch (error: any) { // Explicitly type error as any
    error(error, res); // Utilize the error function to handle errors
  }
};

export const getCommentsByBlogId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error: any) { // Explicitly type error as any
    
    res.status(500).json({ message: 'Internal server error' });
  }
};
