const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const classSchema = new Shema({
    name: {
        type: String,
        required: true

    },

    studentsCount:{type:Number , default:0},

    subjectToTeacher: [{
        subject: {
            type: ObjectId,
            ref: 'Subject'
        }, teacher: {
            type: ObjectId,
            ref: 'Teacher'
        }
    }]


},

    { timestamps: true }

)




module.exports = mongoose.model('Class', classSchema);