const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const studentSchema = new Shema({
    name: {
        type: String,
        reqired: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    nationalId: String,

    imgUrl: {
        type: String,

    },

    father: { type: ObjectId, ref: 'Parent' },

    mother: { type: ObjectId, ref: 'Parent' },

    age: { type: Number, reqired: true },

    gender: { type: String, enum: ['Male', 'Female'] },

    grade: { type: ObjectId, ref: 'Grade' },

    classId: { type: ObjectId, ref: 'Class' },
 
     // make a model 
    adress: {
        lat: String,
        lang: String
    },


   
},

    { timestamps: true })




module.exports = mongoose.model('Student', studentSchema);