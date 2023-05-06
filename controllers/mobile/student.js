const Student = require('../../models/student')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
  const { email, password } = req.body
  
  try {
    // Find the student with the provided email
    const student = await Student.findOne({ email }).select({name:1,imgUrl:1 , nationalId:1 ,password:1})
    
    // If no student found, send an error response
    if (!student) {
      return res.status(400).json({ message: 'student not found' })
    }
    
    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, student.password)
    
    // If the passwords don't match, send an error response
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    
    // If the passwords match, send a success response
    res.status(200).json({ id:student._id,name:student.name , image:student.imgUrl, nationalId:student.nationalId })
  } catch (error) {
    // If there's an error, send an error response
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}


module.exports={
    login
}