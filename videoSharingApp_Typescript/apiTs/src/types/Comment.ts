import mongoose from 'mongoose';

export interface CommentDocument extends mongoose.Document {
    userId:string;
    videoId:string;
    desc: string;
    createdAt?: Date;
    updatedAt?: Date;
}