import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    question:{
        type:String,
        required:true
    },
    privateAccount:{
        type:Boolean,
        required:false,
        default:false
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        req:'Users'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        req:'Users'
    }],
    profilePicUrl:{
        type:String,
        required:false,
        default:''

    },
    bio:{
        type:String,
        required:false,
        default:''

    },
    savedPosts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]

},{timestamps:true})

export default mongoose.model("Users",userSchema)