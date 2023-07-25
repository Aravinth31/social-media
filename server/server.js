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


// applying middlewares cors and bodyparser 
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())



app.use('/api/user',user)
// app.use('/api/comment',comment)
app.use('/api/video',video)



// end point listening port
app.listen(PORT,(req,res)=>{
    console.log(`Listening on port ${PORT}`)
})
