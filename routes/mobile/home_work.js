const router = require('express').Router()

const homeWorkCtrl=require('../../controllers/mobile/home_work')

router.post('/addHomeWork', homeWorkCtrl.addHomeWork)
router.get('/getClassHomeWork/:classId', homeWorkCtrl.getClassHomeWork)
router.post('/filterHomeWorks', homeWorkCtrl.getFilteredHomeWorks)








module.exports=router