const Teacher = require('../../models/teacher')
const TableClass = require('../../models/table_classes')
const Grade = require('../../models/grade')
const Class = require('../../models/class')
const Homework = require('../../models/home_work')




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
      const grade = await Grade.findOne({ classes: { $in: [id] } });

      // Skip the cell if the subject document is not found
      if (!cell.subject) {
        continue;
      }

      const transformedCell = {
        _id: cell._id,
        day: cell.day,
        time: cell.time,
        classId: cell.classId._id,
        className: cell.classId.name,
        subjectId: cell.subject._id,
        subjectName: cell.subject.name,
        gradeName: grade ? grade.name : ''
      };

      newArrCells.push(transformedCell);
    }

    res.json(newArrCells);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


  

  const getTeacherClasses = async (req, res) => {
    try {
      const teacherId = req.params.teacherId;
      const classes = await Class.find({ 'subjectToTeacher.teacher': teacherId })
        .populate('subjectToTeacher.subject')
        .populate('subjectToTeacher.teacher');
      const classIds = classes.map((c) => c._id);
      const grades = await Grade.find({ classes: { $in: classIds } });
  
      if (grades.length > 0) {
        const gradeClasses = [];
        grades.forEach((grade) => {
          classes
            .filter((c) => grade.classes.includes(c._id))
            .forEach((c) => {
              const subjects = c.subjectToTeacher
                .filter((subjectToTeacher) => {
                  return (
                    subjectToTeacher.teacher &&
                    subjectToTeacher.teacher._id.toString() === teacherId &&
                    subjectToTeacher.subject !== null
                  );
                })
                .map((subjectToTeacher) => ({
                  gradeName: grade.name,
                  gradeId: grade._id,
                  className: c.name,
                  classId: c._id,
                  subjectName: subjectToTeacher.subject.name,
                  subjectId: subjectToTeacher.subject._id,
                }));
  
              if (subjects.length > 0) {
                gradeClasses.push(...subjects);
              }
            });
        });
  
        return res.status(200).json(gradeClasses);
      } else {
        return res.status(404).json({ msg: "No grades found with classes that contain this teacher ID" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const addHomeWork = async (req, res) => {
    try {
      // Extract the data from the request body
      const { title, desc, classId, grade, subject, teacher } = req.body;
  
      // Create a new instance of Homework
      const newHomework = new Homework({
        title,
        desc,
        classId,
        grade,
        subject,
        teacher
      });
  
      // Save the new homework to the database
      const savedHomework = await newHomework.save();
  
      res.status(200).json({ message: 'Homework added successfully', homework: savedHomework });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while adding homework' });
    }
  };
  
  const getAllHomeWorksByTeacherId = async (req, res) => {
    try {
      const teacherId = req.params.teacherId;
  
      // Find all homework documents with the given teacherId,
      // populate the referenced fields (grade, subject, class),
      // and select only the necessary fields
      const homeworks = await Homework.find({ teacher: teacherId })
        .populate('grade', 'name')
        .populate('subject', 'name')
        .populate('classId', 'name')
        .select('_id title desc classId grade subject');
  
      // Refactor the result to match the desired format
      const transformedHomeworks = homeworks.map(homework => ({
        _id: homework._id,
        title: homework.title,
        desc: homework.desc,
        className: homework.classId ? homework.classId.name : '',
        gradeName: homework.grade ? homework.grade.name : '',
        subjectName: homework.subject ? homework.subject.name : ''
      }));
  
      res.status(200).json(transformedHomeworks);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching homeworks' });
    }
  };
module.exports = { login, getTeacherTable , getTeacherClasses ,addHomeWork ,getAllHomeWorksByTeacherId }