const router = require('express').Router()

const securityCtrl=require('../../controllers/mobile/security')

router.post('/takeAttendance', securityCtrl.takeAttendance)
router.post('/getStudentNotificationsById', securityCtrl.getStudentAttendanceNotificationsWithPagination)







module.exports=router