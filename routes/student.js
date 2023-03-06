const router = require('express').Router()

const studentCtrl=require('../controllers/student')

router.post('/addStudent',studentCtrl.addStudent)















module.exports=router