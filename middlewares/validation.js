const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const isAuthorized = async (req, res, next) => {
    const  token = req.headers.authorization.split(' ')[1];
    const userId = req.query.userId
    const id = userId

    if (!token) return res.status(400).json({ msg: 'The access token is required' })

    try {
        const user = await Admin.findOne( {_id:id} )
        if (!user) return res.json({ msg: 'Sorry you are not authenticated' })

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
        if (decoded.id == user._id && decoded.role == true) {
            next()
        }
        if (decoded.role == false) {
            return res.status(401).json({ msg: 'Sorry you are not an Admin' })

        }
    } catch (e) {
        if(e.message.includes('Cast to ObjectId'))   return res.status(401).json({ msg: 'Can\'t find this user' })
        return res.status(401).json({ msg: e.message })
    }


}


module.exports = isAuthorized