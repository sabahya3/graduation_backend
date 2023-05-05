const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const gradeSchema = new Shema({
    name: {
        type: String,
        required: true

    },

    classes: [{
        type: ObjectId,
        ref: 'Class'

    }],

    subjects:[{
        type: ObjectId,
        ref: 'Subject'
    }]
    ,
    studentsCount:{type:Number , default:0}



},

    { timestamps: true }

)




module.exports = mongoose.model('Grade', gradeSchema);