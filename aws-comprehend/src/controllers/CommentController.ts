import { Request, Response, NextFunction } from "express";
import { CommentDocument } from "../types/Comment";
import { request } from "../types/Request";
import logger from "../utils/logger";
//import { createError } from "../utils/error.js";
import Comment from './../models/Comment';
import Video from './../models/Video';

export class CommentController {
    //CREATE
    addComment:any = async (req: request, res: Response, next: NextFunction) => {
        const newComment:CommentDocument = new Comment<CommentDocument>({ userId: req.user?.id ,...req.body });

        try {
            const savedComment = await newComment.save();
            res.status(200).json(savedComment); 
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(error);
        }
    }


    //UPDATE
    updateComment:any = async (req: request, res: Response, next: NextFunction) => {
        const comment = await Comment.findByIdAndUpdate(req.params.id);
        if(!comment) return res.status(403).json("Comment not found");

        const video = await Video.findById(req.params.videoId);
        if(req.user?.id === comment?.userId || req.user?.id === video?.userId) {
            try {
                const updatedComment = await Comment.findByIdAndUpdate(
                    req.params.id,
                    { 
                        $set: req.body
                    },
                    {
                        new: true
                    }
                );
                res.status(200).json(updatedComment);
            } catch (err:any) {
                logger.error(err);
                return res.status(403).json("You can Update only your Comment");
                //next(err);
                //res.status(500).json(err);
            }
        } else {
            res.status(500).json("err.message");
        }
    }


    //DELETE
    deleteComment:any = async (req: request, res: Response, next: NextFunction) => {
        try {
            const comment = await Comment.findByIdAndDelete(req.params.id);
            const video = await Video.findById(req.params.id);
            if(req.user?.id === comment?.userId || req.user?.id === video?.userId) {
                await Comment.findByIdAndDelete(req.params.id);
                res.status(200).json("Comment is Removed");
            }
            else {
                return res.status(403).json("You can Delete only your Comment");
            }
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
            //res.status(500).json(err);
        }
    }

    //GET ALL COMMENTS
    getAllComments:any = async (req: request, res: Response, next: NextFunction) => {
        try {
            const comments = await Comment.find({ videoId: req.params.videoId });
            res.status(200).json(comments);
        } catch (err:any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err)
            //res.status(500).json(error);
        }
    }
}