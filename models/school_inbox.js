const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const SchoolInbox = new Shema({

    studentId: {
        type: ObjectId,
        ref: 'Student'
    }

},

    { timestamps: true })




module.exports = mongoose.model('SchoolInbox', SchoolInbox);