const Teacher = require('../../models/teacher')
const Class = require('../../models/class')
const Grade = require('../../models/grade')
const TableClass = require('../../models/table_classes')




const addTeacher = async (req, res) => {
    const { name,
        email,
        password,
        imgUrl,
        phoneNumber,
        age,
        role,
        address,
        salary,
        gender,
        dateOfBirth,
        nationalId
    } = req.body

    try {


        if (!name || !email || !password) return res.status(405).json({ msg: 'Some fields are missing' })
        const newTeacher = await new Teacher({
            name,
            email,
            password,
            imgUrl,
            phoneNumber,
            age,
            role,
            address,
            salary,
            gender,
            dateOfBirth,
            nationalId
        }).save()

        if (newTeacher) return res.status(201).json(newTeacher)
        if (!newTeacher) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) {
        res.status(401).json({ msg: e.message })
    }

}



const getAllTeachers = async (req, res) => {
    try {
      const teachers = await Teacher.find({}, { name: 1, imgUrl: 1, phoneNumber: 1, gender: 1, role: 1, email: 1, nationalId: 1 })
        .sort({ name: 1 }); // Sort by name ascending
  
      if (teachers) {
        return res.status(200).json(teachers);
      } else {
        return res.status(404).json({ msg: "An Error Occurred" });
      }
    } catch (e) {
      console.error(e);
      res.status(404).json({ msg: "Server Error" });
    }
  }
  

const getTeacherById = async (req, res) => {
    try {

        const teacher = await Teacher.findOne({_id:req.params.id})

        if (teacher) return res.status(200).json(teacher)
        if (!teacher) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}



const updateTeacher = async (req, res) => {
    const { name,
        password,
        imgUrl,
        phoneNumber,
        age,
        role,
        address,
        salary,
        gender,
        dateOfBirth,

    } = req.body

    try {
        const id = req.params.id

        if (!id) return res.status(405).json({ msg: 'Please Enter The Teacher Id' })
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, {
            $set: {
                name,
                password,
                imgUrl,
                phoneNumber,
                age,
                role,
                address,
                salary,
                gender,
                dateOfBirth
            }
        }, { new: true })

        if (updatedTeacher) return res.status(201).json(updatedTeacher)
        if (!updatedTeacher) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) {
        res.status(401).json({ msg: e.message })
    }

}



const deleteTeacher = async (req, res) => {

    try {
        const id = req.params.id
        const deleted = await Teacher.deleteOne({ _id: id })

        if (deleted) return res.status(202 ).json({msg:'deleted'})

    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


const getAllTeachersNames = async (req, res) => {
    try {

        const teachers = await Teacher.find({}, { name: 1 })

        if (teachers) return res.status(200).json(teachers)
        if (!teachers) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


const getClassByTeacherId = async (req, res) => {
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
                className: c.name,
                subjectName: subjectToTeacher.subject.name,
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


  

module.exports={
    addTeacher,
    getAllTeachersNames,
    getAllTeachers,
    deleteTeacher,
    updateTeacher ,
    getTeacherById,
    getClassByTeacherId,
    getTeacherTable
}
