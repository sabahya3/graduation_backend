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
    imgUrl: {
        type: String,
      
    },
    phoneNumber: {
        type: String,
        reqired: true
    },
    age: { type: Number, min: 18, max: 60 },

    role: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    gender: { type: String, enum: ['Male', 'Female'] },

    subjects: [{ name: String }],

    accessToken: {
        type: String,

    },


    chats: [{ type: ObjectId, ref: 'Student' }]
},
    { timestamps: true })




module.exports = mongoose.model('Teacher', teacherShema);





