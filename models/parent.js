const mongoose = require('mongoose')
const Shema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types;


const parentSchema = Shema({
    name : String , 
    email : String , 
    pass : String ,
    phone : String , 
    gender : String , 
    chats: [{ type: ObjectId, ref: 'Teacher' }] , 
    notification :  [{ type: ObjectId, ref: 'Notification' }] 
})