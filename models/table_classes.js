
const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const TableClass = new Shema({
    classId:{ type: ObjectId, ref: 'Class' },
    day: Number,
    subject: { type: ObjectId, ref: 'Subject' },
    time:{type: String, required: true},
    teacher: { type: ObjectId, ref: 'Teacher' },
},



    { timestamps: true }

)


module.exports = mongoose.model('TableClass', TableClass);