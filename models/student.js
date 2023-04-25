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


    age: { type: Number, reqired: true },

    gender: { type: String, enum: ['ذكر', 'أنثى'] },

    grade: { type: ObjectId, ref: 'Grade' },

    classId: { type: ObjectId, ref: 'Class' },

     // make a model 
    adress: {
        lat: String,
        lang: String
    },
    meanOfTransport:{type:String , default:''},

    elWasy:[]

   
},

    { timestamps: true })




module.exports = mongoose.model('Student', studentSchema);

/*{
    name,

    email,

    password,

    nationalId,

    imgUrl,


    age,

    gender,

    grade,

    classId,
    adress,

    elWasy

   
} */