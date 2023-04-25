const router = require('express').Router()

const classCtrl=require('../controllers/class')

router.post('/addNewClassToGrade',classCtrl.addNewClassToGrade)
router.get('/getClassById/:id',classCtrl.getClassById)
router.get('/getAllClasses',classCtrl.getAllClasses)
router.get('/subjectToTeacherToClass/:id',classCtrl.subjectToTeacher)
router.patch('/updateClass/:id',classCtrl.updateClass)
router.delete('/deleteClass/:id',classCtrl.deleteClass)

module.exports=router