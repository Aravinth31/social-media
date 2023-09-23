const express = require('express')
const app = express()
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv = require("dotenv")
const bodyParser=require('body-parser')
const cookieParser = require('cookie-parser')

const PORT = 4000
dotenv.config()

// connecting with mangodb  
mongoose.connect(process.env.mango,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected successfully..!!")
    }).catch((err) => {
        throw err
    })


// all routes
const user = require('./routes/User')
const comment = require('./routes/Comment')
const video = require('./routes/Video')


// Configure CORS with options
const allowedOrigins = ['http://localhost:3000']; // Add other origins as needed
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the request origin is in the allowed list or if it's undefined (e.g., from a browser)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// applying middlewares cors and bodyparser 
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())



app.use('/api/user',user)
app.use('/api/comment',comment)
app.use('/api/video',video)



// end point listening port
app.listen(PORT,(req,res)=>{
    console.log(`Listening on port ${PORT}`)
})
