import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: "dzodvwftc",
    api_key: "429135617566142",
    api_secret: "2AoashYMVN99DUA7jVDTzqMR0WI"
});

export const registerController = async (req, res) => {
    try {
        const { username, email, question, password } = req.body;
        if (!username || !email || !password || !question) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'Email already registered'
            });
        }
        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({
                success: false,
                message: 'Username already taken'
            });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            question
        });
        await newUser.save();
        newUser.password = undefined;
        return res.status(200).send({
            success: true,
            message: 'Registered Successfully',
            newUser
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User not registered'
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email and password'
            });
        }
        user.password = undefined;
        user.question = undefined;
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body;
        if (!email || !question || !newPassword) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }
        const user = await userModel.findOne({ email, question });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or answer'
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        return res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}).select("-password");
        return res.status(200).send({
            success: true,
            message: "Get all users",
            users
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
};

export const logoutController = async (req, res) => {
    try {
        console.log("Logged out successfully");
        return res.status(200).send({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
};


export const followUserController = async (req, res) => {
    try {
        const {currentuserid , receiveruserid}=req.body
        let currentUser = await userModel.findById(currentuserid);
        let receiverUser = await userModel.findById(receiveruserid);

        if (!currentUser || !receiverUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const isFollowing = currentUser.following.includes(receiveruserid);

        if (isFollowing) {
            // Unfollow
            return res.status(200).send({
                success: true,
                message: "user Already follow successful"
            });
        } else {
            // Follow
            currentUser.following.push(receiveruserid);
            receiverUser.followers.push(currentuserid);
            await currentUser.save();
            await receiverUser.save();


            return res.status(200).send({
                success: true,
                message: "Follow successful"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
};
    

export const unfollowUserController = async (req, res) => {
    try {
        const {currentuserid , receiveruserid}=req.body
        let currentUser = await userModel.findById(currentuserid);
        let receiverUser = await userModel.findById(receiveruserid);

        if (!currentUser || !receiverUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const isFollowing = currentUser.following.includes(receiveruserid);

            if (isFollowing) {
                currentUser.following = currentUser.following.filter(follow => follow.toString() !== receiveruserid);
                receiverUser.followers = receiverUser.followers.filter(follow => follow.toString() !== currentuserid);
                await currentUser.save();
                await receiverUser.save();

                return res.status(200).send({
                    success: true,
                    message: "Unfollow successful"
                });
            }  
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
};

export const editController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ _id:req.body._id });
        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User not found'
            });
        }
        if(existingUser.profilePicUrl !== req.body.profilePicUrl){
            const uploadResponse = await cloudinary.v2.uploader.upload(req.body.profilePicUrl,{
                folder:"writer_app_profile",
                use_filename:true,
            })
            req.body.profilePicUrl=uploadResponse.url;
           
            
        }
        await userModel.updateOne({_id:req.body._id} , req.body)
        const user = await userModel.findById({_id:req.body._id}).select('-password'); 
        res.status(200).send({success:true , message:'updated successfully' ,user})
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const savePost = async (req, res) => {
    try {
        const { userId, postId } = req.body;
        const user = await userModel.findById(userId);
        if (!user.savedPosts.includes(postId)) {
            user.savedPosts.push(postId);
        } else {
            user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
        }
        await user.save();
        res.status(200).json({ message: 'Post saved/unsaved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getSavedPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        // Find user and populate the savedPosts along with the user field inside posts
        const user = await userModel.findById(userId)
            .populate({
                path: 'savedPosts',
                populate: {
                    path: 'user', 
                    select: 'username profilePicUrl'
                }
            });
        
        res.status(200).json(user.savedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
