const mongoose = require('mongoose')

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,


}

function connectMongoose(callback) {

  
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DB_KEY, dbOptions, (err) => {
        if (err) console.log(err)
        else {
            console.log('Db connected sucessfully!')

            callback()

        }


    },)
}


module.exports = connectMongoose
