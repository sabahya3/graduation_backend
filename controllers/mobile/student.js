const Student = require('../../models/student')
const Class = require('../../models/class')
const TableCell = require('../../models/table_classes');
const Attendance = require('../../models/attendance');
const Homework = require('../../models/home_work');



const bcrypt = require('bcryptjs')

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Find the student with the provided email
    const student = await Student.findOne({ email }).select({ name: 1, imgUrl: 1, nationalId: 1, password: 1, grade: 1, classId: 1 })

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
    res.status(200).json({ id: student._id, name: student.name, image: student.imgUrl, nationalId: student.nationalId, gradeId: student.grade, classId: student.classId })
  } catch (error) {
    // If there's an error, send an error response
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

const getClassTeachers = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Class.findById(id).populate('subjectToTeacher.teacher', 'name imgUrl phoneNumber role _id');

    if (!result) {
      return res.status(404).json({ error: `Class with id ${id} not found` });
    }

    const teachers = result.subjectToTeacher.map((subjectToTeacher) => ({
      id: subjectToTeacher.teacher._id,
      name: subjectToTeacher.teacher.name,
      image: subjectToTeacher.teacher.imgUrl,
      phoneNumber: subjectToTeacher.teacher.phoneNumber,
      role: subjectToTeacher.teacher.role,

    }));

    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve class teachers' });
  }
};


const getWeekTableCellsByClassId = async (req, res) => {
  try {
    const id = req.params.id;
    const tableCells = await TableCell.find({ classId: id, $or: [{ subject: { $ne: null } }, { teacher: { $ne: null } }] })
      .populate('subject', 'name')
      .populate('teacher', 'name')
      .populate('classId', 'name')
      .sort({ day: 1 }); // Sort by day ascending

    const simplifiedTableCells = tableCells.map(({ _id, day, subject, time, teacher, classId, startAt, endAt }) => ({
      _id,
      day,
      startAt,
      endAt,
      subject: subject ? subject.name : null,
      teacher: teacher ? teacher.name : null,
      time

    }));

    res.json(simplifiedTableCells);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

getAttendanceDays = async (req, res) => {
  const id = req.params.id;
  const result = await Attendance.find({ studentId: id }, { createdAt: 1, _id: 0 }).lean();

  if (result) {
    const attendanceDays = result.map((e) => {
      const dateObj = new Date(e.createdAt);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    });
    return res.status(200).json(attendanceDays);
  }

  return res.status(200).json([]);
}


const getAllHomeWorksByClassId = async (req, res) => {
  try {
    const classId = req.params.classId;

    // Find all homework documents with the given teacherId,
    // populate the referenced fields (grade, subject, class),
    // and select only the necessary fields
    const homeworks = await Homework.find({ classId: classId })
      .populate('teacher', 'name')
      .populate('subject', 'name')
      .populate('classId', 'name')
      .select('_id title desc classId teacher subject');

    // Refactor the result to match the desired format
    const transformedHomeworks = homeworks.map(homework => ({
      _id: homework._id,
      title: homework.title,
      desc: homework.desc,
      className: homework.classId ? homework.classId.name : '',
      teacherName: homework.teacher ? homework.teacher.name : '',
      subjectName: homework.subject ? homework.subject.name : ''
    }));

    res.status(200).json(transformedHomeworks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching homeworks' });
  }
};

async function getStudentsByClassId(req, res) {
  const { classId } = req.params;

  try {
    const students = await Student.find({ classId }).select('name id imgUrl elWasy.phoneNumber');
    const modifiedStudents = students.map(student => ({

      id: student.id,
      name: student.name,
      imgUrl: student.imgUrl,
      phoneNumber: student.elWasy.length > 0 ? student.elWasy[0].phoneNumber : null
    }));

    res.json(modifiedStudents);
  } catch (error) {
    // Handle any errors that occurred during the query
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
  login,
  getClassTeachers,
  getWeekTableCellsByClassId,
  getAttendanceDays,
  getAllHomeWorksByClassId,
  getStudentsByClassId
}