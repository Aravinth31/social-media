const mongoose = require('mongoose');


const CommentSchema = mongoose.Schema({
  userId:{
    type : String,
    require : true,
  },
  videoId:{
    type : String,
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