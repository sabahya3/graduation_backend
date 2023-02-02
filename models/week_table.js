const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const weekTable = new Shema({
    startDay: {
        type: Number,
        required: true

    },

    endDay: {
        type: Number,
        required: true

    },

    startHour: { type: Date, required: true },

    endHour: { type: Date, required: true },
    
    lessons: [{
        type: ObjectId,
        ref: 'Lesson'
    }],

},



    { timestamps: true }

)




module.exports = mongoose.model('WeekTable', weekTable);