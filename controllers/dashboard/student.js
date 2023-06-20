const Student = require('../../models/student')
const Teacher = require('../../models/teacher');
const Security = require('../../models/security');
const Attendance = require('../../models/attendance');
const ObjectId = require('mongoose').Types.ObjectId;


const bcrypt = require("bcryptjs");

const addStudent = async (req, res) => {
  const {
    name, email, password, nationalId, imgUrl, age, gender, grade,
    classId, adress, elWasy, meanOfTransport
  } = req.body

  try {


    if (!name || !email || !password) return res.status(405).json({ msg: 'Some fields are missing' })


    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await new Student({
      name, email, password: hashedPassword, nationalId, imgUrl, age, gender, grade,
      classId, adress, elWasy, meanOfTransport
    }).save()

    if (newStudent) return res.status(201).json(newStudent)
    if (!newStudent) return res.status(404).json({ msg: "An Error Occured" })
  } catch (e) {
    res.status(401).json({ msg: e.message })
  }

}

const updateStudent = async (req, res) => {
  const id = req.params.id
  const {
    name, email, nationalId, imgUrl, age, gender, grade,
    classId, adress, elWasy, meanOfTransport
  } = req.body

  if (!id) return res.status(405).json({ msg: 'Please Enter the Id of The Student ' })
  const updateStudent = await Student.findByIdAndUpdate(id, {
    $set: {
      name, email, nationalId, imgUrl, age, gender, grade,
      classId, adress, elWasy, meanOfTransport
    }
  }, { new: true })

  if (updateStudent) return res.status(201).json(updateStudent)
  if (!updateStudent) return res.status(404).json({ msg: "An Error Occured" })
}

const deleteStudent = async (req, res) => {

  try {
    const id = req.params.id
    const deleted = await Student.deleteOne({ _id: id })

    if (deleted) return res.status(202).json({ msg: 'deleted' })

  } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}

getStudentById = async (req, res) => {
  try {

    const student = await Student.findOne({ _id: req.params.id }).populate('grade').populate('classId')

    if (student) return res.status(200).json(student)
    if (!student) return res.status(404).json({ msg: "An Error Occured" })
  } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}

const getClassStudents = async (req, res) => {
  try {
    const classStudents = await Student.find({ classId: req.params.classId }).sort({ name: 1 });
    if (classStudents.length > 0) {
      return res.status(200).json(classStudents);
    } else {
      return res.status(404).json({ msg: "No students found for this class" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getGradeStudents = async (req, res) => {
  try {
    const gradeStudents = await Student.find({ grade: req.params.gradeId }).select("-grade").sort({ name: 1 });
    if (gradeStudents.length > 0) {
      return res.status(200).json(gradeStudents);
    } else {
      return res.status(404).json({ msg: "No students found for this grade" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('grade').populate('classId').sort({ name: 1 });
    if (students.length > 0) {
      return res.status(200).json(students);
    } else {
      return res.status(404).json({ msg: "No students found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};




const getHomePageCounts = async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const securityCount = await Security.countDocuments();
    return res.status(200).json({ studentCount, teacherCount, securityCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}




const getGenderCounts = async (req, res) => {
  try {
    const maleCount = await Student.countDocuments({ gender: 'ذكر' });
    const femaleCount = await Student.countDocuments({ gender: 'أنثى' });
    return res.status(200).json({ maleCount, femaleCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}



getAttendanceDocuments = async (req, res) => {
  const id = req.params.id

  const result = await Attendance.aggregate([
    {
      $match: {
        studentId: ObjectId(id) // Replace `id` with the desired studentId value
      }
    },
    {
      $facet: {
        totalCount: [
          {
            $group: {
              _id: { $month: "$createdAt" },
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              month: "$_id",
              count: 1
            }
          },
          {
            $sort: { month: 1 } // Sort by month in ascending order
          }
        ],
        allMonths: [
          {
            $group: {
              _id: null,
              months: { $push: { $month: "$createdAt" } }
            }
          },
          {
            $project: {
              _id: 0,
              months: {
                $setDifference: [
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  "$months"
                ]
              }
            }
          },
          {
            $unwind: "$months"
          },
          {
            $group: {
              _id: "$months",
              count: { $sum: 0 }
            }
          },
          {
            $project: {
              _id: 0,
              month: "$_id",
              count: 1
            }
          },
          {
            $sort: { month: 1 } // Sort by month in ascending order
          }
        ]
      }
    },
    {
      $project: {
        results: { $concatArrays: ["$totalCount", "$allMonths"] }
      }
    },
    {
      $unwind: "$results"
    },
    {
      $replaceRoot: { newRoot: "$results" }
    }
  ])

  if (result) res.status(200).json({studentAbsence:calculateAbsentDays(result) , studentAtendance :calculateAttendanceDays(result)})
}


function calculateAbsentDays(attendanceArray) {
  if (attendanceArray.length === 0) {
    return  [
      30,
      30,
      30,
      30,
      30,
      30,
      30,
      30,
      30,
      30,
      30,
      30
    ]
  }

  // Sort the array based on the month in ascending order
  attendanceArray.sort((a, b) => a.month - b.month);

  const absentDaysArray = attendanceArray.map((attendance) => {
    const count = attendance.count;
    const absentDays = 30 - count; // Assuming 30 days in a month

    return absentDays;
  });

  return absentDaysArray;
}


function calculateAttendanceDays(attendanceArray) {

  if (attendanceArray.length === 0) {
    return  [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  }

  // Sort the array based on the month in ascending order
  attendanceArray.sort((a, b) => a.month - b.month);

  const attendanceDaysArray = attendanceArray.map((attendance) => {
    const count = attendance.count;
    const attendanceDayes =  count; // Assuming 30 days in a month

    return attendanceDayes;
  });

  return attendanceDaysArray;
}


//----------
getAttendanceDays = async (req, res) => {
  const id = req.params.id;
  const result = await Attendance.find({ studentId: id }, { createdAt: 1, _id: 0 }).lean();

  if (result) {
    const attendanceDays = result.map((e) => {
      const dateObj = new Date(e.createdAt);
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      };
      return dateObj.toLocaleString('en-US', options);
    });
    return res.status(200).json(attendanceDays);
  }

  return res.status(200).json([]);
}


module.exports = { getAttendanceDays, getAttendanceDocuments, getGenderCounts, getHomePageCounts, addStudent, updateStudent, deleteStudent, getStudentById, getClassStudents, getGradeStudents, getAllStudents }