const router = require('express').Router()

const studentCtrl=require('../controllers/dashboard/student')

router.post('/addStudent', studentCtrl.addStudent)
router.patch('/updateStudent/:id',studentCtrl.updateStudent)
router.delete('/deleteStudent/:id',studentCtrl.deleteStudent)
router.get('/getStudentById/:id',studentCtrl.getStudentById)
router.get('/getClassStudents/:classId',studentCtrl.getClassStudents)
router.get('/getGradeStudents/:gradeId',studentCtrl.getGradeStudents)
router.get('/getAllStudents',studentCtrl.getAllStudents)
router.get('/getHomePageCounts',studentCtrl.getHomePageCounts)
router.get('/getGenderCounts',studentCtrl.getGenderCounts)
router.get('/getAttendance/:id',studentCtrl.getAttendanceDocuments)
router.get('/getAttendanceDays/:id',studentCtrl.getAttendanceDays)






module.exports=router