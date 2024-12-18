import { Router } from "express";
import { editController, followUserController, forgotPasswordController, getAllUsersController, getSavedPosts, loginController, logoutController, registerController, savePost, unfollowUserController } from "../controllers/userController.js";
const route=Router();

route.post('/register',registerController);
route.post('/login',loginController);
route.post('/edit',editController);
route.post('/forgot-password',forgotPasswordController);
route.get('/getallusers',getAllUsersController);
route.post('/logout',logoutController);

route.post('/followuser' , followUserController);
route.post('/unfollowuser' , unfollowUserController);
route.post('/savepost',savePost)
route.get('/getsavedpost/:userId',getSavedPosts)

export default route;