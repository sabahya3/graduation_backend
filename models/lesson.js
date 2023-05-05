const mongoose = require('mongoose')
const Shema = mongoose.Schema


const lesson = new Shema({
    day: {
        type: Number,
        required: true
    },

    bgColor: {
        type: String
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    teacherName: { type: String },
    subjectName: { type: String },

},



    { timestamps: true }

)




module.exports = mongoose.model('Lesson', lesson);