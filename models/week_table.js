<<<<<<< HEAD
const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const weekTable = new Shema({
    classId: {
        type: ObjectId,
        ref: 'Class'
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration:{
        type:String,
        required:true
    }
    ,
    lessonNum:{
        type:Number,
        required:true
    }
    ,
    firstDay:{
    type:Number,
    required:true
    },

    lastDay:{
        type:Number,
        required:true
    },
    lessonNum:{
        type:Number,
        required:true
    }

},



    { timestamps: true }

)




=======
const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const weekTable = new Shema({
    classId: {
        type: ObjectId,
        ref: 'Class'
    },

    numOfDays: {
        type: Number,
        required: true

    },

    startTime: { type: Date, required: true },

    endTime: { type: Date, required: true },


},



    { timestamps: true }

)




>>>>>>> bd1d185 (some changes to get school statistics)
module.exports = mongoose.model('WeekTable', weekTable);