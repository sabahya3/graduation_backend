const express = require('express')
var cookieParser = require('cookie-parser')
const cors = require('cors')

require("dotenv").config();


const clusterServer = require('./config/cluster_server')
const adminRouter = require('./routes/admin');
const subjectRouter = require('./routes/subject');
const teacherRouter = require('./routes/teacher');
const gradeRouter = require('./routes/grade');
const classRouter = require('./routes/class');
const studentRouter = require('./routes/student');
const securityRouter = require('./routes/security');
const TableCellRouter = require('./routes/table_class');
const isAuthorized = require('./middlewares/validation');
//---------- mobile --------

const studentMobRouter = require('./routes/mobile/student');
const securityMobRouter = require('./routes/mobile/security');
const homeWorkMobRouter = require('./routes/mobile/home_work');
const teacherMobRouter = require('./routes/mobile/teacher');





const app = express()


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      , 'https://schkolla-mariamkilany.vercel.app/'
    ],
    credentials: true,
  })
);
app.use(cookieParser())
app.use(express.json())

// client - middleware > se4rver 

// routes 
app.use('/v1/admin', adminRouter)
app.use('/v1/subject', isAuthorized, subjectRouter)
app.use('/v1/teacher',  isAuthorized,teacherRouter)
app.use('/v1/grade', isAuthorized, gradeRouter)
app.use('/v1/class', isAuthorized, classRouter)
app.use('/v1/student',  isAuthorized,studentRouter)
app.use('/v1/securityRouter', isAuthorized, securityRouter)
app.use('/v1/tableCellRouter', isAuthorized, TableCellRouter)
//------------Mob-----------------------
app.use('/studentMob', studentMobRouter)
app.use('/teacherMob', teacherMobRouter)

app.use('/securityMob', securityMobRouter)
app.use('/homeWorkMob', homeWorkMobRouter)





app.get('/test', (req, res) => {
  res.json({ success: 'its now workin like a charm' })
})







clusterServer(app)



