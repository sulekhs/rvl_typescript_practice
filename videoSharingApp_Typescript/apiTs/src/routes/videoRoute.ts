import { Application, Router } from 'express';
import { VideoController } from '../controllers/VideoController';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../utils/JwtToken';

export class VideoRouter {
    public router: Router;
    public VideoController: VideoController; 

    constructor() {
        this.router = Router();
        this.routes;
        this.VideoController = new VideoController();
    }
    
    routes(app: Application, router: Router):void {
        //Create A video 
        //app.route("/api/videos/:hotelId").post(this.videoController.createvideo);
        app.post("/api/video", verifyToken, this.VideoController.addVideo);
        //UPDATE A video
        //app.route("/api/video/:id").put(this.videoController.updatevideo);
        app.put("/api/video/:id", verifyToken, this.VideoController.updateVideo);

        //DELETE A video
        //app.route("/api/video/:id/:hotelId").delete(this.videoController.deletevideo);
        app.delete("/api/video/:id", verifyTokenAndAuthorization, this.VideoController.deleteVideo);


        //Find A Particular video
        //app.route("/api/video/:id").get(this.videoController.getParticularvideo);
        app.get("/api/video/find/:id", this.VideoController.getParticularVideo);

        //GET ALL video
        //app.route("/api/video/").get(this.videoController.getAllvideo);
        app.get("/api/video/", this.VideoController.getAllVideos);

        //ADD VIEWS ON videos
        //app.route("/api/video/:id").get(this.videoController.getParticularvideo);
        app.put("/api/video/view", this.VideoController.addView);

        //Find Trending videos
        //app.route("/api/video/:id").get(this.videoController.getParticularvideo);
        app.get("/api/video/trend", this.VideoController.trend);

        //Find Random videos
        //app.route("/api/video/:id").get(this.videoController.getParticularvideo);
        app.get("/api/video/random", this.VideoController.random);

        //Find SUBSCRIBE videos
        //app.route("/api/video/:id").get(this.videoController.getParticularvideo);
        app.get("/api/video/sub",verifyToken, this.VideoController.sub);

        //Find SUBSCRIBE videos
        //app.route("/api/video/:id").get(this.videoController.getParticularvideo);
        app.get("/api/video/tags", this.VideoController.getByTags);

        //Find SUBSCRIBE videos
        //app.route("/api/video/:id").get(this.videoController.getParticularvideo);
        app.get("/api/video/search", this.VideoController.search);
    }
}
// //Create
// router.post("/:hotelId",verifyTokenAndAdmin, videoController.createRoom);

// //Update
// router.put("/:id",verifyTokenAndAdmin, roomController.updateRoom);

// //Update
// router.put("/availability/:id", roomController.updateRoomAvailability);

// //Delete
// router.delete("/:id/:hotelId",verifyTokenAndAdmin, roomController.deleteRoom);

// //Find A Particular Room
// router.get("/:id",verifyTokenAndAuthorization, roomController.getParticularRoom);

// //Get All Rooms
// router.get("/",verifyTokenAndAuthorization, roomController.getAllRooms);

