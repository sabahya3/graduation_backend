const router = require('express').Router()

const studentCtrl=require('../controllers/student')

router.post('/addStudent',studentCtrl.addStudent)
router.patch('/updateStudent/:id',studentCtrl.updateStudent)
router.delete('/deleteStudent/:id',studentCtrl.updateStudent)
router.get('/getStudentById/:id',studentCtrl.getStudentById)
router.get('/getClassStudents/:classId',studentCtrl.getClassStudents)
router.get('/getGradeStudents/:gradeId',studentCtrl.getGradeStudents)




module.exports=router