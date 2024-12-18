import postModel from '../models/postModel.js'
import moment from 'moment'
export const AddPostController=async(req,res)=>{
    try{
        const {title , description,user}=req.body;
        if(!title  || !description ){
            return res.status(400).send({success:false, message:"All fields are required"})
        }
        const newPost = new postModel({
            title,
            description,
            user
            
        })
        await newPost.save();
        res.status(200).send({success:true , message:'Post Added Successfully'})

    }catch(err){
        return res.status(500).send({success:false, message:"something went wronge"})
    }
}

export const GetAllPostsController=async(req,res)=>{
    try{
       const posts = await postModel.find().populate("user").sort({createdAt : -1}).exec();
       res.status(200).send({success:true,message:"Get All Posts" ,posts})

    }catch(err){
        console.log(err)
        return res.status(500).send({success:false, message:"something went wronge"})
    }
}
export const likeOrUnlikeController=async(req,res)=>{
    try{
       const post = await postModel.findById(req.body.postid)

    const userLike = post.likes.find(like => like.user.toString() === req.body.userid);
    if (userLike) {
        // Unlike the post
        post.likes = post.likes.filter(like => like.user.toString() !== req.body.userid);
    } else {
        // Like the post
        post.likes.push({ user: req.body.userid, date: moment().format('MM DD YYYY') });
    }
    await post.save();
       res.status(200).send({success:true,message:"Like and unlike successfull" ,post})

    }catch(err){
        console.log(err)
        return res.status(500).send({success:false, message:"something went wronge"})
    }
}

export const commentsController=async(req,res)=>{
    try{
        const {comment}=req.body;
       const post = await postModel.findById(req.body.postid)
       post.comments.push({user: req.body.userid, date: moment().format('MMMM Do YYYY') , comment})
       await post.save();
       res.status(200).send({success:true,message:"comment successfull" })

    }catch(err){
        console.log(err)
        return res.status(500).send({success:false, message:"something went wronge"})
    }
}

export const editPostController=async(req,res)=>{
    try{
        const {title , description}=req.body;
        await postModel.updateOne({_id:req.body._id} , { $set: { title, description } });
        res.status(200).send({success:true , message:'Post Updated Successfully'})

    }catch(err){
        console.log(err)
        return res.status(500).send({success:false, message:"something went wronge"})
    }
}

export const deletePostController=async(req,res)=>{
    try{
        await postModel.deleteOne({_id:req.body._id})
        res.status(200).send({success:true , message:'Post Updated Successfully'})

    }catch(err){
        console.log(err)
        return res.status(500).send({success:false, message:"something went wronge"})
    }
}