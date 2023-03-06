const router = require('express').Router()

const studentCtrl=require('../controllers/student')

router.post('/addTeacher',studentCtrl.addStudent)















module.exports=router