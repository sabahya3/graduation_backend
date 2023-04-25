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




module.exports = mongoose.model('WeekTable', weekTable);