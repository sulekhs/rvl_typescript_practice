import { Request, Response } from 'express';
import {
  controller,
  httpPost,
} from 'inversify-express-utils';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from 'config';
import logger from '../utils/logger';
import { UserService } from '../service/UserService';

@controller('/api/auth')
export class AuthController {
    constructor(private readonly _service: UserService) {}

    @httpPost('/register')
    async register(req: Request, res: Response) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const user = await this._service.register({...req.body, password:hash});
        
            res.status(201).json({
            data: {
                user,
            },
            })
        } catch (err:any) {
            logger.error(err);
            return res.status(err.message);
        }
    }

    @httpPost('/login')
    async login(req: Request, res: Response) {
        try {
            const user: any = await this._service.login({ username: req.body.username });
            if (!user) return res.status(404).json("User not found!");
            
            const isPasswordCorrect = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isPasswordCorrect)
                return res.status(400).json("Wrong password or username!");
            
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
            return res.status(err.message);
        }
    }
}