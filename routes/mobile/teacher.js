const router = require('express').Router()

const teacherCrtl=require('../../controllers/mobile/teacher')

router.post('/login', teacherCrtl.login)
router.get('/getTeacherTable/:teacherId', teacherCrtl.getTeacherTable)


module.exports=router