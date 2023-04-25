const mongoose = require('mongoose')
const Shema = mongoose.Schema



const securitySchema = new Shema({
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

    phoneNumber: {
        type: String,

    },
    imgUrl: {
        type: String,

    },
    
    job: {
        type: String,

    },

    age: { type: Number, reqired: true },

    gender: { type: String, enum: ['ذكر', 'أنثى'] },

    salary: { type: Number, default: 0 },


},

    { timestamps: true })




module.exports = mongoose.model('Security', securitySchema);