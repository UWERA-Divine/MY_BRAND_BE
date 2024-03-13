import { Schema, model,Types } from 'mongoose';


export interface IComment {
  name: string;
  comment: string;
  blogId: Types.ObjectId;
  date: Date;
}
const SchemaComment = new Schema<IComment>({
  name: { type: String, required: false },
  comment: { type: String, required: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'post',},
  date: { type: Date, required: true, default: new Date() },
});

 const comment = model<IComment>('Comments', SchemaComment);
 
 export default comment;