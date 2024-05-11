import { injectable } from 'inversify'
import { VideoDocument } from '../types/Video';
import { QueryOptions, FilterQuery, UpdateQuery, Types, PipelineStage } from 'mongoose';
import { VideoRepository } from '../repository/VideoRepository';
import { Request } from 'express';

@injectable()
export class VideoService {

    constructor(private readonly _videoRepo: VideoRepository) {}

    async addVideo(payload: VideoDocument) {
        try {
            return await this._videoRepo.addVideo(payload);
        } catch (err) {
            
        }
    }

    async getParticularVideo(id:Types.ObjectId) {
        try {
             return await this._videoRepo.getParticularVideo(id);
        } catch (err) {
            
        }
    }

    async getAllVideos() {
        try {
            return await this._videoRepo.getAllVideos();
        } catch (err) {
            
        }
    }

    async updateVideo(id:Types.ObjectId, update: UpdateQuery<VideoDocument>, options: QueryOptions) {
        try{
            return await this._videoRepo.updateVideo(id, update, options);
        }catch(err) {
    
        }
    }

    async deleteVideo(id:Types.ObjectId) {
        try {
             return await this._videoRepo.deleteVideo(id);
        } catch (err) {
            
        }
    }

    async addView(id:Types.ObjectId, update: UpdateQuery<VideoDocument>) {
        try {
             return await this._videoRepo.addView(id, update);
        } catch (err) {
            
        }
    }

    async trend() {
        try {
             return await this._videoRepo.trend();
        } catch (err) {
            
        }
    }

    async random(options : [ {$sample: { size: number } } ]) {
        try {
             return await this._videoRepo.random(options);
        } catch (err) {
            
        }
    }

    async likes(id: Types.ObjectId, update: UpdateQuery<VideoDocument>) {
        try {
          return await this._videoRepo.likes(id, update);
        } catch (err) {
    
        }
    }

    async dislikes(id: Types.ObjectId, update: UpdateQuery<VideoDocument>) {
        try {
          return await this._videoRepo.likes(id, update);
        } catch (err) {
    
        }
    }

    async sub(id: {userId: string}) {
        try {
          return await this._videoRepo.sub(id);
        } catch (err) {
    
        }
    }

    async getByTags(tags: {tags: { $in : string[] }}) {
        try {
          return await this._videoRepo.getByTags(tags);
        } catch (err) {
    
        }
    }

    async search(title: { title: { $regex: RegExp } }) {
        try {
          return await this._videoRepo.search(title);
        } catch (err) {
    
        }
    }
}