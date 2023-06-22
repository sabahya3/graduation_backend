const router = require('express').Router()

const teacherCrtl=require('../../controllers/mobile/teacher')

router.post('/login', teacherCrtl.login)
router.get('/getTeacherTable/:teacherId', teacherCrtl.getTeacherTable)
router.get('/getTeacherClasses/:teacherId', teacherCrtl.getTeacherClasses)
router.post('/addHomeWork', teacherCrtl.addHomeWork)
router.get('/getAllHomeWorks/:teacherId', teacherCrtl.getAllHomeWorksByTeacherId)


module.exports=router