const router = require('express').Router()

const gradeCtrl=require('../controllers/grade')

router.post('/addGrade',gradeCtrl.addGrade)

router.get('/getAllGrades',gradeCtrl.getGrades)
router.get('/getGradeById/:id',gradeCtrl.getGradeById)
router.get('/getGradeSubjects/:id',gradeCtrl.getGradeSubjects)
router.delete('/deleteGrade/:id',gradeCtrl.deleteGrade)
router.patch('/updateGrade/:id',gradeCtrl.updateGrade)

module.exports=router