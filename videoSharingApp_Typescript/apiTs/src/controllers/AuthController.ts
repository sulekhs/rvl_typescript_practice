import User from "../models/User";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
//import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import config from 'config';

export class AuthController {
    register:any = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.password, salt);

          const newUser = new User({
            ...req.body,
            password: hash,
          });

          await newUser.save();
          res.status(200).json("User has been created.");
        } catch (err: any) {
            logger.error(err);
            return res.status(500).send(err.message);
            //next(err);
        }
    };


    login:any = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user = await User.findOne({ username: req.body.username });
          if (!user) return res.status(404).json("User not found!");

          const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (!isPasswordCorrect)
            return res.status(400).json("Wrong password or username!");
          //console.log("JWT_secret : " + process.env.JWT_SECRET);
          const publicKey = Buffer.from(config.get<string>("jwtSecret"),"base64").toString("ascii");
          //console.log("JWT_secret : " + publicKey);
          const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            publicKey
            //process.env.JWT_SECRET!
          );
          console.log("Token : " + token);
          const { password, isAdmin, ...otherDetails } = user._doc!;
          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });

            return token;
        } catch (err:any) {
            logger.error(err);
            return res.status(500).json(err.message);
            //next(err);
        }
      };
}