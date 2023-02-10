const express = require('express')
var cookieParser = require('cookie-parser')
const cors = require('cors')

require("dotenv").config();


const clusterServer = require('./config/cluster_server')
const adminRouter = require('./routes/admin');
const subjectRouter = require('./routes/subject');
const teacherRouter = require('./routes/teacher');
const gradeRouter = require('./routes/grade');
const isAuthorized = require('./middlewares/validation');


const app = express()
app.use(cors(
    {credentials: true }
))
app.use(cookieParser())
app.use(express.json())

// client - middleware > se4rver 

// routes 
app.use('/v1/admin', adminRouter)
app.use('/v1/subject', isAuthorized, subjectRouter)
app.use('/v1/teacher', isAuthorized, teacherRouter)
app.use('/v1/grade', isAuthorized, gradeRouter)

app.get('/test', (req, res) => {
    res.json({ success: 'its now workin like a charm' })
})

// port number
const port = process.env.PORT || 3000





clusterServer(app)



