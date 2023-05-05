


const createServerWithCluster = (app) => {
    const connectToDb = require('./mongoose_connection')
    const port = process.env.PORT || 4000

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
        // Workers can share any TCP connection
        // In this case it is an HTTP server
        // implementation of mongo db connection 

        connectToDb(() => {
            app.listen(port, () => {
                console.log(`server is running on port ${port}`);
            }
            );
        })
        console.log(`Worker ${process.pid} started`);
    }

}


module.exports = createServerWithCluster;