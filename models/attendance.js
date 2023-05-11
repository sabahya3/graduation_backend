const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const attendanceSchema = new Shema({
    studentId: {
        type: ObjectId,
        ref: 'Student'

    },
    notificationType: {
        type: String,
        enum: ['Enter', 'Leave']
    },

    message: String,

    scanLocation: { lat: String, lang: String },

    locationName:String,

    securityId: {
        type: ObjectId,
        ref: 'Security'
    },



},

    { timestamps: true }
    
    )




module.exports = mongoose.model('Attendance', attendanceSchema);