import { Application, Router } from 'express';
import { SentimentController } from '../controllers/SentimentController';


export class SentimentRouter {
    public router: Router;
    public SentimentController: SentimentController; 

    constructor() {
        this.router = Router();
        this.routes;
        this.SentimentController = new SentimentController();
    }
    
    routes(app: Application, router: Router):void {

        //Sentiment Route
        //app.route("/api/auth/sentiment").post(this.SentimentController.detectSentiment);
        app.post("/api/sentiment", this.SentimentController.detectSentiment);

        //Language Route
        //app.route("/api/language").post(this.SentimentController.detectLanguageCode);
        app.post("/api/language", this.SentimentController.detectLanguageCode);

    }
    
}