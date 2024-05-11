import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { UserDocument } from './../types/User';
import config from 'config';
import Context from '../types/Context';
import { request } from '../types/Request';
import { Payload } from '../types/Payload';

//export class JwtToken {


    const publicKey = Buffer.from(config.get<string>("jwtSecret"), "base64").toString("ascii");
    
    export const verifyToken : any = (req: request | UserDocument | any | Object, res: Response, next: NextFunction) => {
        console.log("verify JWT Called");
        //const context = ctx;
            //console.log("hitting JWT Verify : " + req.cookies?.access_token);
            const token = req.cookies.access_token;
                console.log("Token VerifyToken : " + token);
                //const context = ctx;
            if(token) {
                    //const token = authHeader.split(" ")[1];
                    //console.log("JWTKEY VerifyToken : " + publicKey!);
                    const user : Payload | any = jwt.verify(token, publicKey, (err:any, user:Payload |any) => {
                        if(err) return res.status(403).json("Invalid Token!");
                        req.user = user;
                        console.log("req.user : " + JSON.stringify(req.user));
                        next();
                    });
            } else {
                    return res.status(401).json("You are not Authenticated");
            }

    };


    export const verifyTokenAndAuthorization : any = (req: request | any | Object, res: Response, next: NextFunction) => {
        console.log("verifyTokenAndAuthorization JWT Called");
        verifyToken(req, res, () => {
            console.log("req.user.id : " + req.user.id)
            console.log("req.params.id : " + req.params.id)
            if(req.user.id === req.params.id || req.user.isAdmin ) {
                next();
                //return req.user;
            } else {
                return res.status(403).json("You are not Allowed!");
                //res.status(403).json("You are not Allowed");
            }
        });
    };

    export const verifyTokenAndAdmin : any = (req:request | any, res: Response, next: NextFunction) => {
        verifyToken(req, res, () => {
            if(req.user.isAdmin) {
                next();
            } else {
                return res.status(403).json("You are Not Admin!");
                //res.status(403).json("You are Not Admin")req:Request | any, res: Response
            }
        });
    };
//}
