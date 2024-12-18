import {Router} from 'express';
import { AddPostController, commentsController, deletePostController, editPostController, GetAllPostsController, likeOrUnlikeController } from '../controllers/postController.js';

const route=Router();

route.post("/addpost",AddPostController);
route.get("/getallposts",GetAllPostsController);
route.post('/likeorunlike' ,likeOrUnlikeController)
route.post('/addcomment',commentsController)
route.post('/editpost',editPostController)
route.post('/deletepost',deletePostController)
export default route;
