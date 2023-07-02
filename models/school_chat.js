const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const SchoolChat = new Shema({

    studentId: {
        type: ObjectId,
        ref: 'Student'
    },
    isAdmin:{
        type:Boolean
    },
    msg:String,
    
},


    { timestamps: true })




module.exports = mongoose.model('SchoolChat', SchoolChat);