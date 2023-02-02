const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const homeWorkSchema = new Shema({
    title: {
        type:String,
        required:true

    },

    description: {
        type:String,
        required:true

    },

    classId: {
        type: ObjectId,
        ref:'Class'
       
    },

    teacherId: {
        type: ObjectId,
        ref:'Teacher'
       
    },
  


},

    { timestamps: true }
    
    )




module.exports = mongoose.model('HomeWork', homeWorkSchema);