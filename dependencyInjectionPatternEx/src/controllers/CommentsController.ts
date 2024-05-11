import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  httpPost,
  httpDelete,
  httpPut,
} from 'inversify-express-utils';
import { Types } from "mongoose";
import logger from '../utils/logger';
import { CommentService } from '../service/CommentService';
import { verifyToken } from '../utils/JwtToken';
import { request } from '../types/Request';
import { CommentDocument } from '../types/Comment';
import { VideoService } from '../service/VideoService';

@controller('/api/comments')
export class CommentsController {
  constructor(private readonly _service: CommentService, private readonly _vidService: VideoService) {}

  @httpPost('/addComment', verifyToken)
    async addComment(req: request, res: Response) {
        console.log("req.user?.id : " + req.user?.id);
        try {
            const newComment:CommentDocument | any = await this._service.addComment({ userId: req.user?.id, ...req.body });
        
            res.status(201).json({
            data: {
                newComment,
            },
            })
        } catch (err:any) {
            logger.error(err);
            return res.status(err.message);
        }
  }

  @httpGet('/all/:videoId')
  async getAllComments(req: Request, res: Response) {
    const videoId: string = req.params.videoId;
    try {
        const comments = await this._service.getAllComments(videoId);

        res.json({
          data: {
            comments,
          },
        })
    } catch (err:any) {
          logger.error(err);
          return res.status(err.message);
    }
  }

  @httpGet('/:id')
  async getParticularComment(req: Request, res: Response) {
    const commentId:Types.ObjectId = (req.params.id) as unknown as Types.ObjectId;
    try {
        const comment = await this._service.getParticularComment(commentId)

        res.json({
          data: {
            comment,
          },
        })
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }

  @httpPut('/updatecomment/:videoId/:id', verifyToken)
  async updateComment(req: request, res: Response) {
    const commentId:Types.ObjectId = (req.params.id) as unknown as Types.ObjectId;
    const comment = await this._service.getParticularComment(commentId);
    console.log("req.user?.id : " + req.user?.id + " comment?.userId : " + comment?.userId)
    if(!comment) return res.status(403).json("Comment not found");
    
    const videoId: Types.ObjectId = (req.params.videoId) as unknown as Types.ObjectId;
    const video = await this._vidService.getParticularVideo(videoId);
    if(req.user?.id === comment?.userId || req.user?.id === video?.userId) {
      try {
        const updatedcomment = await this._service.updateComment(
          commentId,
          { 
              $set: req.body
          },
          {
              new: true
          }
        )
    
        res.status(201).json({
          data: {
            comment: updatedcomment,
          },
        })
      } catch (err:any) {
          logger.error(err);
          return res.status(500).json(err.message);
      }
    }else {
       return res.status(403).json("You can update only your comment")
    }
  }

  @httpDelete('/delete/:id', verifyToken)
  async deleteComment(req: request, res: Response) {
      const commentId:Types.ObjectId = (req.params.id) as unknown as Types.ObjectId;
      const comment = await this._service.getParticularComment(commentId);
      console.log("req.user?.id : " + req.user?.id + " comment?.userId : " + comment?.userId)
      if(!comment) return res.status(403).json("Comment not found");
    
      const videoId: Types.ObjectId = (req.params.videoId) as unknown as Types.ObjectId;
      const video = await this._vidService.getParticularVideo(videoId);
      if(req.user?.id === comment?.userId || req.user?.id === video?.userId) {
        try {
          await this._service.deleteComment(commentId)
          return res.status(201).json("comment is deleted");
        } catch (err: any) {
            logger.error(err);
            return res.status(500).json(err.message);
        }
      } else {
          return res.status(403).json("You can delete only your comment")
      }
  }
}  