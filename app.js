const express = require('express')
var cookieParser = require('cookie-parser')
const cors = require('cors')

require("dotenv").config();


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


const connectMongoose = require('./config/mongoose_connection')


const app = express()


app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      , 'https://schkolla-system.vercel.app/'
    ],
    credentials: true,
  })
);
app.use(cookieParser())
app.use(express.json())

// client - middleware > server 

// routes 
app.use('/v1/admin', adminRouter)
app.use('/v1/subject' , subjectRouter)
app.use('/v1/teacher' ,teacherRouter)
app.use('/v1/grade' , gradeRouter)
app.use('/v1/class' , classRouter)
app.use('/v1/student',studentRouter)
app.use('/v1/securityRouter' , securityRouter)
app.use('/v1/tableCellRouter' , TableCellRouter)
//------------Mob-----------------------
app.use('/studentMob', studentMobRouter)
app.use('/teacherMob', teacherMobRouter)

app.use('/securityMob', securityMobRouter)
app.use('/homeWorkMob', homeWorkMobRouter)



const port = process.env.PORT || 4000



app.get('/test', (req, res) => {
  res.json({ success: 'its now workin like a charm' })
})







const openClient = require('./redis_conn').openClient

openClient()


// cluster part ...
const numOfCpus = require('os').cpus().length
const cluster = require('cluster');


// listening to the server 

if (cluster.isMaster) {
    // console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numOfCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        // console.log(`worker ${worker.process.pid} died`);
        cluster.fork();

    });
} else {
    // socket.io implementation
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);
    const currentClient = require('./redis_conn').currentClient
    io.on('connection', (client) => {
        console.log(`Socket connected: ${client.id}`);



        client.on('addUserIdToRedis', async (userId) => {
         // 12345 - > dafasfaf
            // add reciver id
            await currentClient.setEx(userId,24 * 60 * 60, client.id)
            const newUser = await currentClient.get(userId)
           console.log(newUser) 

        });

        client.on('sendMsg',async (data) => {

            const reciverId =await currentClient.get(data.teacherId)
            console.log(reciverId)
            io.to(reciverId).emit('newMsg',{
             msg:data.msg   

            })
            console.log(reciverId)

        })

        client.on('close',async (userId) => {

            await currentClient.del(userId)
        

        })   


        client.on('disconnect', () => {
            // remove reciver id from redis
            console.log(`Socket disconnected: ${client.id}`);
        });
    });
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    // implementation of mongo db connection 

    connectMongoose(() => {
        http.listen(port, () => {
            console.log(`server is running on port ${port}`);
        }
        );
    })
    console.log(`Worker ${process.pid} started`);
}





