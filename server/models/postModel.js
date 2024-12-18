import mongoose, { Mongoose, Types } from 'mongoose';
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    comments:[{user:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}, date:{type:String , required:true} , comment:{type:String,required:true}}],
    likes:[{user:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}, date:{type:String , required:true}}],
    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'Users'
    }

},{timestamps:true})

export default mongoose.model("Post" , postSchema)