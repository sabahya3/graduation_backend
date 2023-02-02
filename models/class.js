const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const classSchema = new Shema({
    name: {
        type: String,
        required: true

    },

    gradeId: {
        type: ObjectId,
        ref: 'Grade'

    },

    teachers: [{
        type: ObjectId,
        ref: 'Teacher'

    }],
   

},

    { timestamps: true }

)




module.exports = mongoose.model('Class', classSchema);