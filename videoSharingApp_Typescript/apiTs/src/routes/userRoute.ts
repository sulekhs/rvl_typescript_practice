import { Application, Router } from 'express';
import { UserController } from '../controllers/UserController';
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from '../utils/JwtToken';


export class UserRouter {
    public router: Router;
    public UserController: UserController;
    
    constructor() {
        this.router = Router();
        this.routes;
        this.UserController = new UserController();
    }
    
    routes(app: Application, router: Router):void {
        
        //UPDATE A USER
        app.put("/api/users/:id", verifyTokenAndAuthorization, this.UserController.updateUser);
         
        //DELETE A USER
        app.delete("/api/users/:id", verifyTokenAndAuthorization, this.UserController.deleteUser);

        //GET ONE USER
        app.get("/api/users/:id", verifyTokenAndAuthorization, this.UserController.getParticularUser);

        //GET ALL USERS
        app.get("/api/users/", verifyTokenAndAdmin, this.UserController.getAllUsers);

        //SUBSCRIBE A USER
        app.put("/api/users/sub/:id", verifyToken, this.UserController.subscribe);

        //UNSUBSCRIBE A USER
        app.put("/api/users/unsub/:id", verifyToken, this.UserController.unsubscribe);

        //LIKE A VIDEO
        app.put("/api/users/like/:videoId", verifyToken, this.UserController.like);

        //DISLIKE A VIDEO
        app.put("/api/users/dislike/:videoId", verifyToken, this.UserController.dislike);
    }

}