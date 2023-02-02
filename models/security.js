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

    age: { type: Number, reqired: true },

    gender: { type: String, enum: ['Male', 'Female'] },



    accessToken: {
        type: String,

    },

},

    { timestamps: true })




module.exports = mongoose.model('Security', securitySchema);