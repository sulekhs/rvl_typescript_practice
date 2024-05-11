import { injectable } from 'inversify'
import { CommentDocument } from '../types/Comment';
import { QueryOptions, FilterQuery, UpdateQuery, Types } from 'mongoose';
import { CommentRepository } from '../repository/CommentRepository';

@injectable()
export class CommentService {

    constructor(private readonly _commentRepo: CommentRepository) {}

    async addComment(payload: CommentDocument) {
        try {
            return await this._commentRepo.addComment(payload);
        } catch (err) {
            
        }
    }

    async getParticularComment(id:Types.ObjectId) {
        try {
             return await this._commentRepo.getParticularComment(id);
        } catch (err) {
            
        }
    }

    async getAllComments(videoId:string) {
        try {
            return await this._commentRepo.getAllComments(videoId);
        } catch (err) {
            
        }
    }

    async updateComment(id:Types.ObjectId, update: UpdateQuery<CommentDocument>, options: QueryOptions) {
        try{
            return await this._commentRepo.updateComment(id, update, options);
        }catch(err) {
    
        }
    }

    async deleteComment(id:Types.ObjectId) {
        try {
             return await this._commentRepo.deleteComment(id);
        } catch (err) {
            
        }
    }
}