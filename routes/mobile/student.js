const router = require('express').Router()

const studentCtrl=require('../../controllers/mobile/student')
const reportsCtrl=require('../../controllers/dashboard/report_to_school')

router.post('/login', studentCtrl.login)
router.get('/getClassTeachers/:id', studentCtrl.getClassTeachers)
router.get('/getWeekTable/:id', studentCtrl.getWeekTableCellsByClassId)
router.get('/getAttendanceDays/:id', studentCtrl.getAttendanceDays)
router.get('/getAllHomeWorks/:classId', studentCtrl.getAllHomeWorksByClassId)
router.get('/getStudentsByClassId/:classId', studentCtrl.getStudentsByClassId)
router.post('/createNewMsg', reportsCtrl.createNewMsgAsAStudent)
router.post('/getAllMsgsWithPaginationByStudentId', reportsCtrl.getAllMsgsWithPaginationByStudentId)









module.exports=router