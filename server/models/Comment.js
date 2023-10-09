const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
  userId:{
    type : mongoose.Schema.ObjectId,
    require : true,
  },
  videoId:{
    type : mongoose.Schema.ObjectId,
    require : true,
  },
  comment:{
    type : String,
    require : true
  }  
 
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Comment', CommentSchema);