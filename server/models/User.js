const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
  name:{
    type : String,
    require : true
  },
  email:{
    type : String,
    require : true,
    unique : true
  },
  password:{
    type : String,
    require : true
  },
  img:{
    type : String,
    default:"https://my-you-tube.s3.ap-southeast-2.amazonaws.com/default_profile_pic.png"
  },
  subscribers:{
    type : Number,
    default:0
  },
  subscribedUsers:{
    type : [String],
    default: []
  },
  extraInfo:{
    type : Object,
    default : {"theme":"light"}
  }  
},
{
    timestamps:true
}
);

module.exports = mongoose.model('User', UserSchema);