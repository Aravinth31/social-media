const User = require('../models/User');
const Video = require('../models/Video');


const createVideo = async (req, res) => {
    try{
        const newVideo = await Video.create({userId:req.user.id, ...req.body})
        res.status(200).json({video:newVideo, status:true, message :"Video Created Successfully"});
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const updateVideo = async (req, res) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video)
        {
            throw "Video not Found..!!"
        }
        if(req.user.id === video.userId){
            let updateVideo
            if (req.query.tags) {
                const newTag = req.query.tags.split(",")
                updateVideo = await Video.findByIdAndUpdate(req.params.id, { $push:{ tags : newTag}}, {new: true})
            }else{
                // {new:true} is used to show the updated response when updatedUser data is displayed
                updateVideo = await Video.findByIdAndUpdate(req.params.id, { $set:req.body}, {new: true})
            }
            res.status(200).json({ video:updateVideo, status : true, message : "Video Updated Successfully"})    
        }else{
            return res.status(403).json({ status : flase, message : "Authorization Error..!!"})
        }
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const deleteVideo = async (req, res) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video)
        {
            throw "Video not Found..!!"
        }
        if(req.user.id === video.userId){
            const deleteVideo = await Video.findByIdAndDelete(req.params.id)
            res.status(200).json({ status : true, message : "Video Deleted Successfully"})
        }else{
            return res.status(403).json({ status : flase, message : "Authorization Error..!!"})
        }
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const getVideo = async (req, res) => {
    try{
        const video = await Video.findById(req.params.id)
        if(!video)
        {
            throw "Video not Found..!!"
        }
        const user = await User.findById(video.userId);
        const {password, ...others} = user._doc
        res.status(200).json({ video:video, user:others,status : true, message : "Video Details Fetched Successfully..!!"})
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const updateViews = async (req, res) => {
    try{
        const updateVideoViews = await Video.findByIdAndUpdate(req.params.id, { $inc:{views:1}}, {new: true})
        res.status(200).json({ video:updateVideoViews, status : true, message : "Video views Updated Successfully"})
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const getTrendingVideos = async (req, res) => {
    try{
        const trendingVideos = await Video.find().sort({views:-1})
        res.status(200).json({ video:trendingVideos, status : true, message : "Trending Videos Fetched Successfully..!!"})
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const getRandomVideos = async (req, res) => {
    try{
        const pipeline = [
        {
          $sample: { size: 40 }
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
            title: 1,
            description: 1,
            imgUrl:1,
            videoUrl:1,
            views:1,
            tags:1,
            likes:1,
            dislikes:1,
            createdAt:1,
            'userDetails._id': 1,
            'userDetails.name': 1,
            'userDetails.email': 1,
            'userDetails.img': 1,
            'userDetails.subscribers': 1,
          }
        }
      ];
        const randomVideos = await Video.aggregate(pipeline);
        res.status(200).json({ video:randomVideos, status : true, message : "Random Videos Fetched Successfully..!!"})
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const getSubscribedVideos = async (req, res) => {
    try{
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers

        const videos = await Promise.all(
            subscribedChannels.map( (channelId) => {
                return Video.find({userId : channelId})
            })
        )
        res.status(200).json({ videos:videos.flat().sort((a,b) => b.createdAt - a.createdAt), status : true, message : "Subscribed Videos Fetched Successfully..!!"})
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const getByTags = async (req, res) => {
    try{
        const tags = req.query.tags.split(",")
        const randomVideos = await Video.find({ tags : { $in : tags}}).limit(20)
        res.status(200).json({ video:randomVideos, status : true, message : "Videos by Tags Fetched Successfully..!!"})
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}


const searchVideo = async (req, res) => {
    try{
        const query = req.query.q;
        const pipeline = [
            {
                $match: {
                    title: { $regex: query, $options: "i" }
                }
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
                title: 1,
                description: 1,
                imgUrl:1,
                videoUrl:1,
                views:1,
                tags:1,
                likes:1,
                dislikes:1,
                createdAt:1,
                'userDetails._id': 1,
                'userDetails.name': 1,
                'userDetails.email': 1,
                'userDetails.img': 1,
                'userDetails.subscribers': 1,
              }
            }
        ];    
          const randomVideos = await Video.aggregate(pipeline);
          res.status(200).json({ video:randomVideos, status : true, message : "Related Videos Fetched Successfully..!!"})
    }
    catch(err){
        return res.status(400).json({status:false, message :err});
    }
}




module.exports = {createVideo, updateVideo, deleteVideo, getVideo, updateViews, getTrendingVideos, getRandomVideos, getSubscribedVideos, getByTags, searchVideo}