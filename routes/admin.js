const router = require('express').Router()

const adminCtrl=require('../controllers/admin')

router.post('/login',adminCtrl.login)
router.post('/register',adminCtrl.register)
router.get('/refreshToken',adminCtrl.refreshToken)
router.get('/logout',adminCtrl.logout)




module.exports=router

