import mongoose from "mongoose";
import { CommentDocument } from "../types/Comment";


export const CommentSchema: mongoose.Schema<CommentDocument> = new mongoose.Schema({
        userId:{
            type:String,
            required:true,
        },
        videoId:{
            type:String,
            required:true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model<CommentDocument>("Comment", CommentSchema);
export type Comment = typeof CommentSchema;
export default Comment;