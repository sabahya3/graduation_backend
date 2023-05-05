const router = require('express').Router()

const teacherCtrl=require('../controllers/teacher')

router.post('/addTeacher',teacherCtrl.addTeacher)

router.get('/getAllTeacherNamesWithIds',teacherCtrl.getAllTeachersNames)
router.get('/getTeacher/:id',teacherCtrl.getTeacherById)
router.get('/getAllTeachers',teacherCtrl.getAllTeachers)

router.delete('/deleteTeacher/:id',teacherCtrl.deleteTeacher)
router.patch('/updateTeacher/:id',teacherCtrl.updateTeacher)
router.get('/getClassByTeacherId/:teacherId',teacherCtrl.getClassByTeacherId)





module.exports=router
