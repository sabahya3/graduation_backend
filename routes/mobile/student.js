const router = require('express').Router()

const studentCtrl=require('../../controllers/mobile/student')

router.post('/login', studentCtrl.login)







module.exports=router