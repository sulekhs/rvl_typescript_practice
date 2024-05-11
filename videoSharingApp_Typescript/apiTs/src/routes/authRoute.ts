import { Application, Router } from 'express';
import { AuthController } from '../controllers/AuthController';


export class AuthRouter {
    public router: Router;
    public AuthController: AuthController; 

    constructor() {
        this.router = Router();
        this.routes;
        this.AuthController = new AuthController();
    }
    
    routes(app: Application, router: Router):void {

        //Register Route
        //app.route("/api/auth/register").post(this.AuthController.register);
        app.post("/api/auth/register", this.AuthController.register);

        //Login Route
        //app.route("/api/auth/login").post(this.AuthController.login);
        app.post("/api/auth/login", this.AuthController.login);
    }
    
}