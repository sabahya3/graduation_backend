const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const homeWorkSchema = new Shema({
    title: {
        type:String,
        required:true

    },

    desc: {
        type:String,
        required:true

    },

    classId: {
        type: ObjectId,
        ref:'Class'
       
    },

    grade: {
        type: ObjectId,
        ref:'Grade'
       
    },
    subject: {
        type: ObjectId,
        ref:'Subject'
       
    },
    teacher: {
        type: ObjectId,
        ref:'Teacher'
       
    },

  


},

    { timestamps: true }
    
    )




module.exports = mongoose.model('HomeWork', homeWorkSchema);