import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { request } from "../types/Request";
import Video from "../models/Video";
//import { createError } from "../utils/error.js";

export class UserController {
    //UPDATE
    updateUser:any = async (req: request, res: Response, next: NextFunction) => {
        console.log("req.user?.id : " + req.user?.id)
        if(req.params.id === req.user?.id) {
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    { 
                        $set: req.body
                    },
                    {
                        new: true
                    }
                );
                res.status(200).json(updatedUser);
            } catch (err:any) {
                logger.error(err);
                return res.status(500).send(err.message);
                //next(err);
                //res.status(500).json(err);
            }
        }
        else {
            res.status(403).json("You can Update only your Account");
        }
    };


    //DELETE
    deleteUser:any = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User is Removed");
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(err);
        }
    };


    //GET User BY ID
    getParticularUser:any = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    };

    //Subscribe A User
    subscribe:any = async (req: request, res: Response, next: NextFunction) => {
        try {
            await User.findByIdAndUpdate(
                req.user?.id, {
                    $push:{subscribedUsers:req.params.id}
                }
            );
            await User.findByIdAndUpdate(
                req.params.id, {
                    $inc: { subscribers: 1 }
                }
            );
            res.status(200).json("Subscription Succesfull!");
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err)
            //res.status(500).json(error);
        }
    };


    //UnSubscribe A User
    unsubscribe:any = async (req: request, res: Response, next: NextFunction) => {
        try {
            await User.findByIdAndUpdate(
                req.user?.id, {
                    $pull:{subscribedUsers:req.params.id}
                }
            );
            await User.findByIdAndUpdate(
                req.params.id, {
                    $inc: { subscribers: -1 }
                }
            );
            res.status(200).json("UnSubscription Succesfull!");
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err)
            //res.status(500).json(error);
        }
    };


    //GET ALL UserS
    getAllUsers:any = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err)
            //res.status(500).json(error);
        }
    };

    //GET ALL UserS
    like:any = async (req: request, res: Response, next: NextFunction) => {
        const id = req.user?.id;
        const videoId = req.params.videoId;
        try {
            await Video.findByIdAndUpdate(videoId, {
                $addToSet:{ likes:id },
                $pull:{ dislikes:id }
            });
            res.status(200).json("The Video has been liked");
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err)
            //res.status(500).json(error);
        }
    };


    //GET ALL UserS
    dislike:any = async (req: request, res: Response, next: NextFunction) => {
        const id = req.user?.id;
        const videoId = req.params.videoId;
        try {
            await Video.findByIdAndUpdate(videoId, {
                $addToSet:{ dislikes:id },
                $pull:{ likes:id }
            });
            res.status(200).json("The Video has been disliked");
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err)
            //res.status(500).json(error);
        }
    };
}