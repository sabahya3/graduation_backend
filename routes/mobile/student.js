const router = require('express').Router()

const studentCtrl=require('../../controllers/mobile/student')

router.post('/login', studentCtrl.login)
router.get('/getClassTeachers/:id', studentCtrl.getClassTeachers)
router.get('/getWeekTable/:id', studentCtrl.getWeekTableCellsByClassId)
router.get('/getAttendanceDays/:id', studentCtrl.getAttendanceDays)
router.get('/getAllHomeWorks/:classId', studentCtrl.getAllHomeWorksByClassId)








module.exports=router