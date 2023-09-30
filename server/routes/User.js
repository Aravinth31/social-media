const express=require('express')
var router = express.Router();
const {verifyToken} = require('../controllers/Auth')

const {checkTokenExpiry, signup, signin, googleAuth, deleteUser, updateUser, getUser, subscribe, unsubscribe, like, dislike} = require('../controllers/User')


// check user token validity
router.get("/check-token-validity", verifyToken, checkTokenExpiry)


// create user
router.post("/signup", signup)


// user signin
router.post("/signin",signin )


// google authentcation
router.post("/google/oauth", googleAuth)


// update user
router.put("/:id", verifyToken, updateUser)


// delete user
router.delete("/:id", verifyToken, deleteUser)


// get a user
router.get("/find/:id", getUser)


// subscribe a user
router.put("/subscribe/:id", verifyToken, subscribe)


// unsubscribe a user
router.put("/unsubscribe/:id", verifyToken, unsubscribe)


// like a video
router.put("/like/:videoId", verifyToken, like)


// dislike a video
router.put("/dislike/:videoId", verifyToken, dislike)



module.exports = router;
