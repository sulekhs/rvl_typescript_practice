import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    img?: string;
    subscribers:number;
    subscribedUsers:[string]
    createdAt?: Date;
    updatedAt?: Date;
    _doc?: any;
}
