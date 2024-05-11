import { injectable } from 'inversify'
import mongoose from 'mongoose';
import config from 'config';
import logger from "../utils/logger";
import * as dotenv from 'dotenv';
dotenv.config();
import {UserSchema} from '../models/User';
import {VideoSchema} from '../models/Video';
import {CommentSchema} from '../models/Comment';
import { UserDocument } from '../types/User';
import { VideoDocument } from '../types/Video';
import { CommentDocument } from '../types/Comment';

@injectable()
export class DBService {
  private _db: typeof mongoose

    connect:any = async () => {
        const mongoUri = config.get<string>('mongoUri');
        try {
            this._db = await mongoose.connect(mongoUri);
            logger.info('Connceted to MongoDB');
        } catch (err:any) {
            logger.error("mongoDB cannot be connected!");
            process.exit(1);
        }
    }

    get users() {
        return this._db.model<UserDocument>('User', UserSchema)
    }

    get videos() {
        return this._db.model<VideoDocument>('Video', VideoSchema)
    }

    get comments() {
        return this._db.model<CommentDocument>('Comment', CommentSchema)
    }
}