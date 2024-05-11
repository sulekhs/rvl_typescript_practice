import { Application, Router } from 'express';
import { CommentController } from '../controllers/CommentController';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../utils/JwtToken';
//import { JwtToken } from './../utils/JwtToken';

export class CommentRouter {
    public router: Router;
    public CommentController: CommentController;
    //public JwtToken: JwtToken;

    constructor() {
        this.router = Router();
        this.routes;
        this.CommentController = new CommentController();
        //this.JwtToken = new JwtToken();
    }
    
    routes(app: Application, router: Router):void {
        //Create A Hotel 
        //app.route("/api/hotels/").post(this.HotelController.createHotel);
        app.post("/api/comments/:id", verifyTokenAndAuthorization, this.CommentController.addComment);

        //UPDATE A Comment
        //app.route("/api/comments/:id").put(this.CommentController.updateComment);
        app.put("/api/comments/:videoId/:id", verifyToken, this.CommentController.updateComment);

        //DELETE A Comment
        //app.route("/api/comments/:id").delete(this.CommentController.deleteComment);
        app.delete("/api/comments/:videoId/:id", verifyToken, this.CommentController.deleteComment);

        //GET ONE Comment
        //app.route("/api/comments/find/:id").get(this.CommentController.getParticularComment);
        //app.get("/api/comments/:videoId", this.CommentController.getParticularComment);

        //GET ALL comments
        //app.route("/api/comments/").get(this.CommentController.getAllcomments);
        app.get("/api/comments/:videoId", this.CommentController.getAllComments);
    }
}

// //Create
// router.post("/",verifyTokenAndAuthorization, hotelController.createHotel);

// //Update
// router.put("/:id",verifyTokenAndAuthorization, hotelController.updateHotel);

// //Delete
// router.delete("/:id",verifyTokenAndAdmin, hotelController.deleteHotel);

// //Find A Particular Hotel
// router.get("/find/:id", hotelController.getParticularHotel);

// //Get All comments
// router.get("/", hotelController.getAllHotels);

// //Count Hotels By City 
// router.get("/countByCity", hotelController.countByCityHotels);

// //Count Hotels By Type 
// router.get("/countByType", hotelController.countByTypeHotels);

// //Featured Hotels 
// router.get("/featured", hotelController.getAllFeaturedHotels);

// //Get Hotels By Price 
// router.get("/hotelByPrice", hotelController.getHotelByPrice);

// //Get Hotel Rooms 
// router.get("/rooms/:id", hotelController.getHotelRooms);