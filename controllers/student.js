const Student = require('../models/student')

const bcrypt = require("bcrypt");

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

getClassStudents = async (req, res) => {
    try {
        const classStudents = await Student.find({ classId: req.params.classId });
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

getGradeStudents = async (req, res) => {
    try {
        const gradeStudents = await Student.find({ grade: req.params.gradeId }).select("-grade");
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
getAllStudents = async (req, res) => {
    try {
      const students = await Student.find().populate('grade').populate('classId');
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


module.exports = { addStudent, updateStudent, deleteStudent, getStudentById, getClassStudents, getGradeStudents  , getAllStudents}