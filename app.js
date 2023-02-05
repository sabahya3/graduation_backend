const express = require('express')
var cookieParser = require('cookie-parser')
const cors = require('cors')

require("dotenv").config();


const clusterServer=require('./config/cluster_server')
const adminRouter=require('./routes/admin');
const subjectRouter=require('./routes/subject');
const teacherRouter=require('./routes/teacher');
const isAuthorized = require('./middlewares/validation');


const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// routes 
app.use('/v1/admin',adminRouter)
app.use('/v1/subject',isAuthorized , subjectRouter)
app.use('/v1/teacher',isAuthorized , teacherRouter)

app.get('/test', (req , res)=>{
    res.json({success:'hahahha'})
})

// port number
const port = process.env.PORT || 3000





clusterServer(app)



