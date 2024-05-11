import mongoose from "mongoose";
import { UserDocument } from "../types/User";


const UserSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
        },
        isAdmin:{
            type: Boolean,
            default: false,
        },
        img:{
            type: String,
        },
        subscribers:{
            type:Number,
            default:0
        },
        subscribedUsers:{
            type:[String]
        }
    },
    { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;