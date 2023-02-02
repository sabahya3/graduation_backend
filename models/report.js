const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const monthlyReport = new Shema({
    pdfTitle: {
        type: String,

    },
    reportType: {
        type: String,
    },
    pdfUrl: { type: String },

    studentId: {
        type: ObjectId,
        ref: 'Student'
    }

},

    { timestamps: true })




module.exports = mongoose.model('MonthlyReport', monthlyReport);