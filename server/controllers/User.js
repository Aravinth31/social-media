const User = require('../models/User');
const Video = require('../models/Video');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const checkTokenExpiry = async(req, res) => {
    res.status(200).json({status : true, message : "Valid Token..!!"})
}


const signup = async (req,res) => {
    try{
        const {email} = req.body
        const userEmailExists = await User.findOne({email});
        if(userEmailExists)
        {
            return res.status(400).json({status:false, message :"User Email Already Exists"});
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = await User.create({...req.body, password:hash})
        const {password, ...others} = newUser._doc
        let token = generateToken(newUser._id)
        res.cookie("access_token",token, { httpOnly:false }).status(200).json({ user:others, status : true ,message : "User Signup Successful"})
    }
    catch(err){
        return res.status(500).json({status:false, message :err});
    }
}


const signin = async (req,res) => {    
    try{
        const {email, password} = req.body
        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            let token = generateToken(user._id)
            const {password, ...others} = user._doc
            res.cookie("access_token",token, { httpOnly:false }).status(200).json({ user:others, status : true, message : "User Signin Successfull"})
        }else{
            return res.status(201).send({status:false, msg : "Invalid credintials..!!"});
        }
    
    }
    catch(err){
        return res.status(500).json({status:false, message :err});
    }

}

const googleAuth = async (req,res) => {
    res.json({ status : true, message : "Google Signin Successfull"})
}


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.jwt_secret, { expiresIn : '600s'})
}

const updateUser = async (req,res) => {
    if(req.params.id === req.user.id)
    {
        try{
            // {new:true} is used to show the updated response when updatedUser data is displayed
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set:req.body}, {new: true})
            const {password, ...others} = updateUser._doc
            res.status(200).json({ user:others, status : true, message : "User Updated Successfully"})
        }
        catch(err)
        {
            return res.status(404).json({ status : false, message : err})
        }
    }
    else
    {
        return res.status(400).json({ status : false, message : "Access Denied.!!"})
    }
}

const deleteUser = async (req,res) => {
    if(req.params.id === req.user.id)
    {
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ status : true, message : "User Deleted Successfully"})
        }
        catch(err)
        {
            return res.status(404).json({ status : false, message : err})
        }
    }
    else
    {
        return res.status(400).json({ status : false, message : "Access Denied.!!"})
    }
}

const  getUser= async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user)
        {
            throw "User not Found..!!"
        }
        const {password, ...others} = user._doc
        res.status(200).json({ user:others,status : true, message : "User Details fetched Successfully"})
    }
    catch(err)
    {
        return res.status(404).json({ status : false, message : err})
    }
}

const subscribe = async (req,res) => {
    try{
        const checkUser = await User.findById(req.user.id);
        if(checkUser._doc.subscribedUsers.indexOf(req.params.id) === -1){
            const user = await User.findByIdAndUpdate(req.user.id, { $push : { subscribedUsers : req.params.id}}, {new: true})
            const { password: userPassword, ...userOthers } = user._doc;
            const channel = await User.findByIdAndUpdate(req.params.id, { $inc : { subscribers : 1}}, {new: true})
            const { password: channelPassword, ...channelOthers } = channel._doc;
            res.status(200).json({ user:userOthers, channel:channelOthers, status : true, message : "Channel Subscribed Successfully"})    
        }else{
            const { password: userPassword, ...userOthers } = checkUser._doc;
            const channel = await User.findById(req.params.id);
            const { password: channelPassword, ...channelOthers } = channel._doc;
            res.status(200).json({ user:userOthers, channel:channelOthers, status : true, message : "Channel Subscribed Successfully"})    
        }
    }
    catch(err)
    {
        return res.status(404).json({ status : false, message : err})
    }
}

const unsubscribe = async (req,res) => {
    try{
        const checkUser = await User.findById(req.user.id);
        if(checkUser._doc.subscribedUsers.indexOf(req.params.id) !== -1){
            const user = await User.findByIdAndUpdate(req.user.id, { $pull : { subscribedUsers : req.params.id}}, {new: true})
            const { password: userPassword, ...userOthers } = user._doc;
            const channel =  await User.findByIdAndUpdate(req.params.id, { $inc : { subscribers : -1}}, {new: true})
            const { password: channelPassword, ...channelOthers } = channel._doc;
            res.status(200).json({ user:userOthers, channel:channelOthers, status : true, message : "Channel Unsubscribed Successfully"})    
        }else{
            const { password: userPassword, ...userOthers } = checkUser._doc;
            const channel = await User.findById(req.params.id);
            const { password: channelPassword, ...channelOthers } = channel._doc;
            res.status(200).json({ user:userOthers, channel:channelOthers, status : true, message : "Channel Subscribed Successfully"})    
        }

    }
    catch(err)
    {
        return res.status(404).json({ status : false, message : err})
    }
}

const like = async (req,res) => {
    try{
        const video = await Video.findByIdAndUpdate(req.params.videoId , { $addToSet : {likes : req.user.id} , $pull : {dislikes : req.user.id}}, {new: true});
        res.status(200).json({ video:video, status : true, message : "Video Liked Successfully"});
    }
    catch(err)
    {
        return res.status(404).json({ status : false, message : err});
    }
}

const dislike = async (req,res) => {
    try{
        const video = await Video.findByIdAndUpdate(req.params.videoId , { $addToSet : {dislikes : req.user.id} , $pull : {likes : req.user.id}}, {new: true});
        res.status(200).json({ video:video, status : true, message : "Video disliked Successfully"});
    }
    catch(err)
    {
        return res.status(404).json({ status : false, message : err});
    }
}


module.exports = {checkTokenExpiry, signup, signin, googleAuth, updateUser, deleteUser, getUser, subscribe, unsubscribe, like, dislike}