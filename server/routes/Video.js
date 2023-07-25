const express=require('express')
var router = express.Router();
const {verifyToken} = require('../controllers/Auth')

const {createVideo, updateVideo, deleteVideo, getVideo, updateViews, getTrendingVideos, getRandomVideos, getSubscribedVideos, getByTags, searchVideo} = require('../controllers/Video')


// create a video
router.post("/new", verifyToken, createVideo)


// update a video
router.put("/:id", verifyToken, updateVideo)


// delete a video
router.delete("/:id", verifyToken, deleteVideo)


// get a video
router.get("/find/:id", getVideo)

// update views of a video
router.put("/views/:id", updateViews)


// get trending videos
router.get("/trend", getTrendingVideos)


// get random videos at home page
router.get("/random", getRandomVideos)


// get subscribed channels video
router.get("/sub", verifyToken, getSubscribedVideos)


// get subscribed channels video
router.get("/tags", getByTags)


// get subscribed channels video
router.get("/search", searchVideo)



module.exports = router;