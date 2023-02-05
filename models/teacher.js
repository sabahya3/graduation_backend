const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const teacherShema = new Shema({
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
    dateOfBirth: {
        type: String,

    },
    imgUrl: {
        type: String,
        default: ''

    },
    phoneNumber: {
        type: String,
        reqired: true
    },
    age: { type: Number, min: 18, max: 60 },

    role: {
        type: String,
    },
    address: {
        type: String,
    },
    nationalId: {
        type: String,
    },
    salary: { type: Number, default: 0 },
    gender: { type: String, enum: ['Male', 'Female'] },

},
    { timestamps: true })




module.exports = mongoose.model('Teacher', teacherShema);





