const Teacher = require('../../models/teacher')
const TableClass = require('../../models/table_classes')
const Grade = require('../../models/grade')




const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Find the student with the provided email
        const teacher = await Teacher.findOne({ email }).select({ name: 1, imgUrl: 1, password: 1 })

        // If no student found, send an error response
        if (!teacher) {
            return res.status(400).json({ message: 'student not found' })
        }


        // Compare the provided password with the hashed password stored in the database
        isMatch = password == teacher.password

        // If the passwords don't match, send an error response
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // If the passwords match, send a success response
        res.status(200).json({ id: teacher._id, name: teacher.name, image: teacher.imgUrl })
    } catch (error) {
        // If there's an error, send an error response
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}



const getTeacherTable = async (req, res) => {
    const { teacherId } = req.params;
  
    try {
      // Find all cells that contain the specified teacherId
      const cells = await TableClass.find({ teacher: teacherId })
        .select('-updatedAt -__v -teacher')
        .populate('classId', 'name _id')
        .populate('subject', 'name')
        .lean();
  
      const newArrCells = [];
  
      // Extract classIds from the cells
      for (var cell of cells) {
        const id = cell.classId._id;
        const grade = await Grade.findOne({ classes: {$in:[id]} });
        cell.gradeName = grade ? grade.name : '';
        newArrCells.push(cell);
      }
  
      res.json(newArrCells);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

module.exports = { login, getTeacherTable }