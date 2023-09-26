
const jwt =  require('jsonwebtoken');
const User = require('../models/User');


const verifyToken = async (req,res,next) => {
    const token = req.cookies.access_token;
    if(token){
        try{
            const decode = jwt.verify(token, process.env.jwt_secret);
            req.user = await User.findById(decode.id).select('-password');
            next();
        }
        catch(err)
        {
            res.clearCookie("access_token");
            res.status(401).json({err : "Not Authorized, Wrong Token"});
        }
    }else{
        res.clearCookie("access_token");
        return res.status(401).json({err : "Not Authorized, No Token Found"});
    }
}

module.exports = {verifyToken};