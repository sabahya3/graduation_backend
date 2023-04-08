const router = require('express').Router()

const securityCtrl=require('../controllers/security_man')

router.post('/addSecurityMember',securityCtrl.addSecurityMember)
router.patch('/updateSecurityMember/:id',securityCtrl.updateSecurityMember)
router.delete('/deleteSecurityMember/:id',securityCtrl.deleteSecurityMember)
router.get('/getSecurityMemberById/:id',securityCtrl.getSecurityMember)
router.get('/getAllMembers',securityCtrl.getAllMembers)




module.exports=router