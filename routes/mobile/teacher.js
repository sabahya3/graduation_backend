const router = require('express').Router()
const chatCtrl=require('../../controllers/mobile/teacher_student_chat')
const teacherCrtl=require('../../controllers/mobile/teacher')

router.post('/login', teacherCrtl.login)
router.get('/getTeacherTable/:teacherId', teacherCrtl.getTeacherTable)
router.get('/getTeacherClasses/:teacherId', teacherCrtl.getTeacherClasses)
router.post('/addHomeWork', teacherCrtl.addHomeWork)
router.get('/getAllHomeWorks/:teacherId', teacherCrtl.getAllHomeWorksByTeacherId)
router.post('/getMsgsWithPagination', chatCtrl.getMessagesWithPagination)
router.post('/addNewMsg', chatCtrl.createMsgAsATeacher)

module.exports=router