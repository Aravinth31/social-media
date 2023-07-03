const express = require('express')
const app = express()
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv = require("dotenv")
const bodyParser=require('body-parser')

const PORT = 4000
dotenv.config()


mongoose.connect(process.env.mango,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected successfully..!!")
    }).catch((err) => {
        throw err
    })


app.listen(PORT,(req,res)=>{
    console.log(`Listening on port ${PORT}`)
})
