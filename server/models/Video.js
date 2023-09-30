const mongoose = require('mongoose');


const VideoSchema = mongoose.Schema({
  userId:{
    type : mongoose.Schema.ObjectId,
    require : true,
  },
  title:{
    type : String,
    require : true,
  },
  description:{
    type : String,
    require : true
  },
  imgUrl:{
    type : String,
    require: true
  },
  videoUrl:{
    type : String,
    require: true
  },
  views:{
    type : Number,
    default: 0
  },
  tags:{
    type : [String],
    default: []
  },
  likes:{
    type : [String],
    default: []
  },
  dislikes:{
    type : [String],
    default: []
  }   
 
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Video', VideoSchema);