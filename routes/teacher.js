const router = require('express').Router()

const teacherCtrl=require('../controllers/dashboard/teacher')

router.post('/addTeacher',teacherCtrl.addTeacher)

router.get('/getAllTeacherNamesWithIds',teacherCtrl.getAllTeachersNames)
router.get('/getTeacher/:id',teacherCtrl.getTeacherById)
router.get('/getAllTeachers',teacherCtrl.getAllTeachers)

router.delete('/deleteTeacher/:id',teacherCtrl.deleteTeacher)
router.patch('/updateTeacher/:id',teacherCtrl.updateTeacher)
router.get('/getClassByTeacherId/:teacherId',teacherCtrl.getClassByTeacherId)
router.get('/getTeacherTable/:teacherId', teacherCtrl.getTeacherTable)






module.exports=router
