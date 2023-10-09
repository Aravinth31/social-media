const express=require('express')
var router = express.Router();
const {verifyToken} = require('../controllers/Auth')

const { addComment, getComment, deleteComment } = require('../controllers/Comment')

// add a comment
router.post("/", verifyToken, addComment)


// get comments of a video
router.get("/:videoId", getComment)


// delete a comment
router.delete("/:id", verifyToken, deleteComment)


module.exports = router;