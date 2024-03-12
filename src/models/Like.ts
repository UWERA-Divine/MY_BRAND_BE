import mongoose, { Schema, Document } from 'mongoose';

export interface Like extends Document {
  like: Boolean;
  blogId: string;
}

const likeSchema: Schema = new Schema({
  like: { type: Boolean, required: false},
  blogId: { type: String, required: false },
});

export default mongoose.model<Like>('Like', likeSchema);