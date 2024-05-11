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
import { UserService } from '../service/UserService';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../utils/JwtToken';
import { request } from '../types/Request';
import { VideoService } from '../service/VideoService';

@controller('/api/users')
export class UserController {
  constructor(private readonly _service: UserService, private readonly _vidservice: VideoService) {}

  @httpGet('/', verifyTokenAndAdmin)
  async getAllUsers(req: Request, res: Response) {
    try {
        const users = await this._service.getAllUsers()

        res.json({
          data: {
            users,
          },
        })
    } catch (err:any) {
          logger.error(err);
          return res.status(err.message);
    }
  }

  @httpGet('/:id', verifyToken)
  async getParticularUser(req: request, res: Response) {
    try {
        const user = await this._service.getParticularUser(req.params.id)

        res.json({
          data: {
            user,
          },
        })
    } catch (err:any) {
        logger.error(err);
        return res.status(err.message);
    }
  }

  @httpPut('/update/:id')
  async updateUser(req: Request, res: Response) {
    const userId:Types.ObjectId = (req.params.id) as unknown as Types.ObjectId;
    try {
        const updatedUser = await this._service.updateUser(
          userId,
          { 
              $set: req.body
          },
          {
              new: true
          }
        )
    
        res.status(201).json({
          data: {
            user: updatedUser,
          },
        })
    } catch (err:any) {
        logger.error(err);
        return res.status(500).json(err.message);
    }
  }

  @httpDelete('/delete/:id')
  async deleteUser(req: Request, res: Response) {
    try {
        await this._service.deleteUser(req.params.id)
        return res.json("User is deleted");
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(err.message);
    }
  }

  @httpPut('/sub/:id', verifyToken)
  async subscribe(req: request, res: Response) {
    const subscriberId:Types.ObjectId | string = req.params.id;
    try {
        await this._service.subscribe(
          req.user?.id, 
          {$push: { subscribedUsers: subscriberId }}
        );
        await this._service.subscribe(
          subscriberId, {
              $inc: { subscribers: 1 }
          }
      );
      res.status(200).json("Subscription Succesfull!");
    } catch (err:any) {
        logger.error(err);
        return res.status(500).json(err.message);
    }
  }

  @httpPut('/unsub/:id', verifyToken)
  async unsubscribe(req: request, res: Response) {
    const subscriberId:Types.ObjectId | string = req.params.id;
    try {
        await this._service.unsubscribe(
          req.user?.id, 
          {$pull: { subscribedUsers: subscriberId }}
        );
        await this._service.unsubscribe(
          subscriberId, {
              $inc: { subscribers: -1 }
          }
        );
      res.status(200).json("UnSubscription Succesfull!");
    } catch (err:any) {
        logger.error(err);
        return res.status(500).json(err.message);
    }
    //await this._service.updateUser()
  }

  @httpPut('/like/:videoId', verifyToken)
  async likes(req: request, res: Response) {
    const id = req.user?.id;
    console.log("userId : " + id);
    const videoId: Types.ObjectId = (req.params.videoId) as unknown as Types.ObjectId;
    console.log("videoId : " + videoId);
    const video = await this._vidservice.getParticularVideo(videoId);
    if(!video) {
      return res.status(404).json("Video not found");
    } else {
      try {
        await this._vidservice.likes(videoId, {
            $addToSet:{ likes: id}, 
            $pull: { dislikes: id }
        });
        res.status(200).json("Video is Liked!");
      } catch (err:any) {
          logger.error(err);
          return res.status(500).json(err.message);
      }
    }
    //await this._service.updateUser()
  }

  @httpPut('/dislike/:videoId', verifyToken)
  async dislikes(req: request, res: Response) {
    const id = req.user?.id;
    console.log("userId : " + id);
    const videoId: Types.ObjectId = (req.params.videoId) as unknown as Types.ObjectId;
    console.log("videoId : " + videoId);
    const video = await this._vidservice.getParticularVideo(videoId);
    if(!video) {
      return res.status(404).json("Video not found");
    } else {
      try {
        await this._vidservice.dislikes(videoId, {
            $addToSet:{ dislikes: id}, 
            $pull: { likes: id }
        });
        res.status(200).json("Video is disliked!");
      } catch (err:any) {
          logger.error(err);
          return res.status(500).json(err.message);
      }
    }
    //await this._service.updateUser()
  }
}