const router = require('express').Router()

const subjectCtrl=require('../controllers/dashboard/subject')

router.post('/addSubject',subjectCtrl.addSubject)

router.get('/getAllSubjects',subjectCtrl.getAllSubjects)

router.delete('/deleteSubject/:id',subjectCtrl.deleteSubject)




module.exports=router
