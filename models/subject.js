const mongoose = require('mongoose')
const Shema = mongoose.Schema



const subject = new Shema({
    name: {
        type: String,
        required: true

    },

},



)




module.exports = mongoose.model('Subject', subject);