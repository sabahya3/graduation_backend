const mongoose = require('mongoose')

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,


}

function connectMongoose(callback) {

    const DB_KEY='mongodb://AS:RQ6IcBvQMygQiyAr@cluster0-shard-00-00.4lxon.mongodb.net:27017,cluster0-shard-00-01.4lxon.mongodb.net:27017,cluster0-shard-00-02.4lxon.mongodb.net:27017/GraduationProject?ssl=true&replicaSet=atlas-4yywzn-shard-0&authSource=admin&retryWrites=true&w=majority'
    mongoose.set('strictQuery', true);
    mongoose.connect(DB_KEY, dbOptions, (err) => {
        if (err) console.log(err)
        else {
            console.log('Db connected sucessfully!')

            callback()

        }


    },)
}


module.exports = connectMongoose