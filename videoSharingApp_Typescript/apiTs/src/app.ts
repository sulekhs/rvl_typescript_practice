import express from 'express';
import * as dotenv from 'dotenv';
import 'dotenv/config';
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthRouter } from './routes/authRoute';
import { UserRouter } from './routes/userRoute';
import { VideoRouter } from './routes/videoRoute';
import { CommentRouter } from './routes/commentRoute';
//import { JwtToken } from './utils/JwtToken';


class App{
    public app: express.Application;
    public router: express.Router;
    public authRouter: AuthRouter = new AuthRouter();
    public userRouter: UserRouter = new UserRouter();
    public videoRoute: VideoRouter = new VideoRouter();
    public commentRoute: CommentRouter = new CommentRouter();
    //public jwtToken: JwtToken = new JwtToken();

    constructor(){
        this.app = express();
        this.router = express();
        this.config();
        this.authRouter.routes(this.app, this.router);
        this.userRouter.routes(this.app, this.router);
        this.videoRoute.routes(this.app, this.router);
        this.commentRoute.routes(this.app, this.router); 
    }

    private config():void{
        this.app.use(express.json());
        this.app.use(cors({ origin:true, credentials:true }));
        this.app.use(cookieParser());
    }
}

export default new App().app;