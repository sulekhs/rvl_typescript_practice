import { injectable } from 'inversify';
import { DBService } from '../service/DBService';
import { VideoDocument } from '../types/Video';
import { QueryOptions, UpdateQuery, Types, PipelineStage, Aggregate, FilterQuery, AggregateOptions } from "mongoose";
import { Request } from 'express';


@injectable()
export class VideoRepository {
    constructor(private readonly _dbContext: DBService) {}

    async addVideo({ userId, title, desc, imgUrl, videoUrl, views, tags, likes, dislikes } : VideoDocument) {
        try {
            return await this._dbContext.videos.create({ userId, title, desc, imgUrl, videoUrl, views, tags, likes, dislikes })
        } catch (err) {

        }
    }

    async getParticularVideo(id : Types.ObjectId) {
        try {
             return await this._dbContext.videos.findById(id);
        } catch (err) {

        }
    }

    async getAllVideos() {
        try {
            return await this._dbContext.videos.find({});
        } catch (err) {

        }
    }

    async updateVideo(id: Types.ObjectId, update: UpdateQuery<VideoDocument>, options: QueryOptions) {
        try {
            return await this._dbContext.videos.findByIdAndUpdate(id, update, options);
        } catch (err) {
            
        }
    }

    async deleteVideo(id : Types.ObjectId) {
        try {
             return await this._dbContext.videos.findByIdAndDelete(id);
        } catch (err) {

        }
    }

    async addView(id : Types.ObjectId, update: UpdateQuery<VideoDocument>) {
        try {
             return await this._dbContext.videos.findByIdAndUpdate(id, update);
        } catch (err) {

        }
    }

    async trend() {
        try {
             return await this._dbContext.videos.find().sort({ views: 1 });
        } catch (err) {

        }
    }

    async random(options: [ {$sample: { size: number } } ]) {//options?:( AggregateOptions | undefined) | Aggregate<VideoDocument[]> | PipelineStage.Sample["$sample"]
        try {//PipelineStage.Sample["$sample"] | any  Aggregate<any[]>
             return await this._dbContext.videos.aggregate(options);
        } catch (err) {//[{ $sample: { size: 1 } }]

        }
    }

    async likes(id: Types.ObjectId, update: UpdateQuery<VideoDocument>) {
        try {
          return this._dbContext.videos.findByIdAndUpdate(id, update);
        } catch (err) {
          
        }
    }

    async dislikes(id: Types.ObjectId, update: UpdateQuery<VideoDocument>) {
        try {
          return this._dbContext.videos.findByIdAndUpdate(id, update);
        } catch (err) {
          
        }
    }

    async sub(id: {userId: string}) {
        try {
          return this._dbContext.videos.find(id);
        } catch (err) {
          
        }
    }

    async getByTags(tags: {tags: { $in : string[] }}) {
        try {
          return this._dbContext.videos.find(tags).limit(20);
        } catch (err) {
          
        }
    }

    async search(title: { title: { $regex: RegExp } }) {
        try {
          return this._dbContext.videos.find(title).limit(20);
        } catch (err) {
          
        }
    }
}