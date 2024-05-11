import { injectable } from 'inversify';
import { DBService } from '../service/DBService';
import { CommentDocument } from '../types/Comment';
import { QueryOptions, UpdateQuery, Types } from "mongoose";

@injectable()
export class CommentRepository {
    constructor(private readonly _dbContext: DBService) {}

    async addComment({ userId, videoId, desc } : CommentDocument) {
        try {
            return await this._dbContext.comments.create({ userId, videoId, desc })
        } catch (err) {

        }
    }

    async getParticularComment(id : Types.ObjectId) {
        try {
             return await this._dbContext.comments.findById(id);
        } catch (err) {

        }
    }

    async getAllComments(videoId:string) {
        try {
            return await this._dbContext.comments.find({videoId});
        } catch (err) {

        }
    }

    async updateComment(id: Types.ObjectId, update: UpdateQuery<CommentDocument>, options: QueryOptions) {
        try {
            return await this._dbContext.comments.findByIdAndUpdate(id, update, options);
        } catch (err) {
            
        }
    }

    async deleteComment(id : Types.ObjectId) {
        try {
             return await this._dbContext.comments.findByIdAndDelete(id);
        } catch (err) {

        }
    }
}