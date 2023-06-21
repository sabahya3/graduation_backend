
const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const weekTable = new Shema({
    classId: {type: ObjectId,ref: 'Class'},
    duration:{type: String , required:true},
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    firstDay:{type:String , required:true},
    lastDay:{type:String , required:true},
    lessonNum:{type:String , required:true}
},



    { timestamps: true }

)


module.exports = mongoose.model('WeekTable', weekTable);