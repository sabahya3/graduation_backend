const router = require('express').Router()

const studentCtrl=require('../../controllers/mobile/student')

router.post('/login', studentCtrl.login)
router.get('/getClassTeachers/:id', studentCtrl.getClassTeachers)
router.get('/getWeekTable/:id', studentCtrl.getWeekTableCellsByClassId)







module.exports=router