<<<<<<< HEAD
const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const TableClass = new Shema({
    classId:{ type: ObjectId, ref: 'Class' },
    day: Number,
    subject: { type: ObjectId, ref: 'Subject' },
    teacher: { type: ObjectId, ref: 'Teacher' },
},



    { timestamps: true }

)




=======
const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const TableClass = new Shema({
    classId:{ type: ObjectId, ref: 'Class' },
    day: Number,
    subject: { type: ObjectId, ref: 'Subject' },
    startAt: { type: Date, default: Date.now },
    endAt: { type: Date, default: Date.now }
  , teacher: { type: ObjectId, ref: 'Teacher' },
},



    { timestamps: true }

)




>>>>>>> bd1d185 (some changes to get school statistics)
module.exports = mongoose.model('TableClass', TableClass);