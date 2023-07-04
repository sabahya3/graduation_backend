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

const { createProxyMiddleware } = require('http-proxy-middleware');





const app = express()

const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://schkolla-system.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.sendStatus(200); // Send HTTP status 200 for preflight requests
  } else {
    // Continue with the actual request
    next();
  }
});

// Other routes and middleware

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


app.use(cookieParser())
app.use(express.json())

// client - middleware > server 

// routes 
app.use('/v1/admin', adminRouter)
app.use('/v1/subject', isAuthorized , subjectRouter)
app.use('/v1/teacher',  isAuthorized,teacherRouter)
app.use('/v1/grade', isAuthorized, gradeRouter)
app.use('/v1/class', isAuthorized, classRouter)
app.use('/v1/student',studentRouter)
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



