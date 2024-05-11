import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  httpPost,
  httpDelete,
  httpPut,
} from 'inversify-express-utils';
import { PipelineStage, Types } from "mongoose";
import logger from '../utils/logger';
import { VideoService } from '../service/VideoService';
import { UserService } from '../service/UserService';
import { verifyToken } from '../utils/JwtToken';
import { request } from '../types/Request';

@controller('/api/videos')
export class VideosController {
  constructor(private readonly _service: VideoService, private readonly _userservice: UserService) {}

  @httpPost('/addVideo', verifyToken)
    async addVideo(req: request, res: Response) {
        console.log("req.user?.id : " + req.user?.id);
        try {
            const newVideo = await this._service.addVideo({ userId: req.user?.id, ...req.body });
        
            res.status(201).json({
            data: {
                newVideo,
            },
            })
        } catch (err:any) {
            logger.error(err);
            return res.status(err.message);
        }
  }

  @httpGet('/')
  async getAllVideos(req: Request, res: Response) {
    try {
        const videos = await this._service.getAllVideos()

        res.json({
          data: {
            videos,
          },
        })
    } catch (err:any) {
          logger.error(err);
          return res.status(err.message);
    }
  }

  @httpGet('/:id')
  async getParticularVideo(req: Request, res: Response) {
    const videoId:Types.ObjectId = (req.params.id) as unknown as Types.ObjectId;
    try {
        const video = await this._service.getParticularVideo(videoId)

        res.json({
          data: {
            video,
          },
        })
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }

  @httpPut('/updatevideo/:id', verifyToken)
  async updateVideo(req: request, res: Response) {
    const videoId:Types.ObjectId = (req.params.id) as unknown as Types.ObjectId;
    const video = await this._service.getParticularVideo(videoId);
    
    if(req.user?.id === video?.userId){
      try {
        const updatedVideo = await this._service.updateVideo(
          videoId,
          { 
              $set: req.body
          },
          {
              new: true
          }
        )
    
        res.status(201).json({
          data: {
            video: updatedVideo,
          },
        })
      } catch (err:any) {
          logger.error(err);
          return res.status(500).json(err.message);
      }
    }else {
       return res.status(403).json("You can update only your video")
    }
  }

  @httpDelete('/delete/:id', verifyToken)
  async deleteVideo(req: request, res: Response) {
      const videoId:Types.ObjectId = (req.params.id) as unknown as Types.ObjectId;
      const video = await this._service.getParticularVideo(videoId);
      
      if(req.user?.id === video?.userId) {
        try {
          await this._service.deleteVideo(videoId)
          return res.status(201).json("Video is deleted");
        } catch (err: any) {
            logger.error(err);
            return res.status(500).json(err.message);
        }
      } else {
          return res.status(403).json("You can delete only your video")
      }
  }

  @httpPut('/view/:id')
  async addView(req: Request, res: Response) {
    const videoId:Types.ObjectId = (req.params.id) as unknown as Types.ObjectId;
    try {
        const video = await this._service.addView(
            videoId, {
              $inc: { views:1 }
            }
        )

        res.json({
          data: {
            video,
          },
        })
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }

  @httpGet('/trend')
  async trend(req: Request, res: Response) {
    try {
        const videos = await this._service.trend();

        res.json({
          data: {
            videos,
          },
        })
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }//cmbgkqklpsgdrdcl	

  @httpGet('/v2/random')
  async random(req: Request, res: Response) {
    try {
        const videos = await this._service.random([{ $sample: { size: 1 } }] as unknown as [ {$sample: { size: number } } ]);

        res.json({
          data: {
            videos,
          },
        })
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }

  @httpGet('/v2/getsubscribeToChannel', verifyToken)
  async sub(req: request, res: Response) {
    try {
        const user = await this._userservice.getParticularUser(req.user?.id);
        const subscribedChannels = user?.subscribedUsers;
        
        const list = await Promise.all(
            subscribedChannels!.map((channelId:string) => {
                return this._service.sub({ userId: channelId } as unknown as {userId: string});
            })
        )
        
        res.status(200).json(list.flat())
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }

  @httpGet('/v2/tags')
  async getByTags(req: request, res: Response) {
    const tags = (<string>req.query.tags).split(",");
    try {
        const videos = await this._service.getByTags({ tags: { $in: tags } } as unknown as {tags: { $in : string[] }});
        
        res.status(200).json(videos);
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }

  @httpGet('/v2/search')
  async search(req: request, res: Response) {
    const query = <string>req.query.q;
    try {  
        const videos = await this._service.search({ title: { $regex: new RegExp(query, 'i') } } as unknown as { title: { $regex: RegExp } });
        
        res.status(200).json(videos);
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }
}  