import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
//import { createError } from "../utils/error.js";
import Comment from './../models/Comment';
import Video from "../models/Video";
import { request } from "../types/Request";
import User from './../models/User';
import { VideoDocument } from "../types/Video";

export class VideoController {
    //ADD A VIDEO
    addVideo:any = async (req: request, res: Response, next: NextFunction) => {
        console.log("req.user?.id : " + req.user?.id)
        const newVideo = new Video({ userId: req.user?.id, ...req.body });

        try {
            const savedVideo = await newVideo.save();
            res.status(200).json(savedVideo); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }


    //UPDATE
    updateVideo:any = async (req: request, res: Response, next: NextFunction) => {
        console.log("req.params.videoId : " + req.params.id)
        const video: VideoDocument | null = await Video.findByIdAndUpdate(req.params.id);
        if(!video) return res.status(402).json("Video not found");
        //console.log("req.user?.id : " + req.user?.id)
        //console.log("video.userId : " + video?.userId)
        if(req.user?.id === video?.userId) {
            try {
                const updatedVideo:VideoDocument | null  = await Video.findByIdAndUpdate(
                    req.params.id,
                    { 
                        $set: req.body
                    },
                    {
                        new: true
                    }
                );
                res.status(200).json(updatedVideo);
            } catch (err:any) {
                logger.error(err);
                return res.status(500).send(err.message);
                //next(err);
                //res.status(500).json(err);
            }
        }
        else {
                return res.status(500).json("invalid ");
        }
    }


    //DELETE
    deleteVideo:any = async (req: request, res: Response, next: NextFunction) => {
        const video = await Video.findByIdAndDelete(req.params.id);
        if(!video) return res.status(402).json("Video not found");
        if(req.user?.id === video.userId) {
            try {
                await Video.findByIdAndDelete(req.params.id);
                res.status(200).json("Video is Removed");
            } catch (err) {
                next(err);
                //res.status(500).json(err);
            }
        }
        else {
            return res.status(500).json("invalid ");
        }
    }


    //GET Room BY ID
    getParticularVideo:any = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const video = await Video.findById(req.params.id);
            res.status(200).json(video);
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error)
        }
    }


    //GET ALL RoomS
    getAllVideos:any = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rooms = await Video.find();
            res.status(200).json(rooms);
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err)
            //res.status(500).json(error);
        }
    }

    //ADD A VIEW
    addView:any = async (req: request, res: Response, next: NextFunction) => {
        try {
            await Video.findByIdAndUpdate(
                req.params.id, {
                    $inc: { views: 1 }
            });
            res.status(200).json("View has Increased"); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }


    //RANDOM VIDEO
    random:any = async (req: request, res: Response, next: NextFunction) => {
        try {
            const videos = await Video.aggregate(
                [{ $sample:{size: 40} }]
            );
            res.status(200).json(videos); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }


    //TRENDING VIDEOS
    trend:any = async (req: request, res: Response, next: NextFunction) => {
        try {
            const videos = await Video.find().sort({ views: 1 })
            res.status(200).json(videos); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }


    //RANDOM VIDEOS
    sub:any = async (req: request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.user?.id);
            const subscribedChannels = user!.subscribedUsers;

            const list = await Promise.all(
                subscribedChannels!.map((channelId:string) => {
                    return Video.find({ userId: channelId })
                })
            );
            res.status(200).json(list.flat().sort((a:any, b:any) => b?.createdAt - a?.createdAt));//flat prevent nested array
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }


    //TRENDING VIDEOS
    getByTags:any = async (req: request, res: Response, next: NextFunction) => {
        const tags = (<string>req.query.tags).split(",");
        try {
            const videos = await Video.find({ tags: { $in: tags } }).limit(20);
            res.status(200).json(videos); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }


    //TRENDING VIDEOS
    search:any = async (req: request, res: Response, next: NextFunction) => {
        const query = req.query.q;
        try {
            const videos = await Video.find({ title: { $regex: query, $options:"i" } }).limit(40);
            res.status(200).json(videos); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }
}



