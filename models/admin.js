const mongoose = require('mongoose')
const Shema = mongoose.Schema



const Admin = new Shema({

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            msg: "Please Enter A Valid Email.",
        },
    },
    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

},
    { timestamps: true })




module.exports = mongoose.model('admins', Admin);





