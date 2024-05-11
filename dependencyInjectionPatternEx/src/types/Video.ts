import mongoose from 'mongoose';

export interface VideoDocument extends mongoose.Document {
    userId:string;
    title:string;
    desc:string;
    imgUrl:string;
    videoUrl:string;
    views?:number;
    tags?:[string];
    likes?:[string];
    dislikes?:[string];
    createdAt?: Date;
    updatedAt?: Date;
}