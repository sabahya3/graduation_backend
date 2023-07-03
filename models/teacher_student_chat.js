const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const TeacherStudentChat = new Shema({

    studentId: {
        type: ObjectId,
        ref: 'Student'
    },
    teacherId: {
        type: ObjectId,
        ref: 'Teacher'
    },
    isTeacher: {
        type: Boolean
    },
    msg: String,

},


    { timestamps: true })




module.exports = mongoose.model('TeacherStudentChat', TeacherStudentChat);