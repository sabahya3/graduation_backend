const express = require('express')
var cookieParser = require('cookie-parser')
const cors = require('cors')

require("dotenv").config();


const clusterServer=require('./config/cluster_server')
const adminRouter=require('./routes/admin')


const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/v1/admin',adminRouter)
app.get('/val',(req , res)=>{
    res.json({success:'server successful'})
})

// port number
const port = process.env.PORT || 3000





clusterServer(app)



