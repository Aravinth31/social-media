const Comment = require('../models/Comment')
const Video = require('../models/Video')
const mongoose = require('mongoose');  
  
const addComment = async (req,res) => {    
    try{
        if(!req.body.videoId){
            throw "video ID cannot be empty..!!"
        }
        const newComment = await Comment.create({...req.body, userId:req.user.id})
        res.status(200).json({ comments:newComment, status : true, message : "New Comments Added Successfully"});
    }
    catch(err){
        return res.status(500).json({status:false, message :err});
    }

}

const getComment = async (req,res) => {    
    try{
        const pipeline = [
            {
                $match: { videoId: new mongoose.mongo.ObjectId(req.params.videoId) }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'userId', 
                foreignField: '_id',
                as: 'userDetails'
              }
            },
            {
              $project: {
                _id: 1,
                userId:1,
                videoId:1,
                comment:1,
                createdAt:1,
                'userDetails._id': 1,
                'userDetails.name': 1,
                'userDetails.email': 1,
                'userDetails.img': 1,
              }
            },
            {
                $sort : { createdAt : -1}
            }
          ];
        const comment = await Comment.aggregate(pipeline);
        res.status(200).json({ comments:comment, status : true, message : "Comments Fetched Successfully"});
    }
    catch(err){
        return res.status(500).json({status:false, message :err});
    }

}


const deleteComment = async (req,res) => {    
    try{
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId);
        if(req.user.id == comment.userId || req.user.id == video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json({ status : true, message : "Comment Deleted Successfully"});
        }else{
            return res.status(400).json({ status : false, message : "Access Denied.!!"});
        }
    }
    catch(err){
        return res.status(500).json({status:false, message :err});
    }

}


module.exports = {addComment, getComment, deleteComment}