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
            name,

            email,

            password,

            nationalId,

            imgUrl,


            age,

            gender,

            grade,

            classId,
            adress,

            elWasy,
            meanOfTransport
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
            name, email,  nationalId, imgUrl, age, gender, grade,
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

        if (deleted) return res.status(202 ).json({msg:'deleted'})

    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}

getStudentById= async (req, res) => {
    try {

        const student = await Student.findOne({_id:req.params.id}).populate('grade').populate('classId')

        if (student) return res.status(200).json(student)
        if (!student) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


getClassStudents= async (req, res) => {
    try {

        const classStudents = await Student.find({classId:req.params.classId})

        if (classStudents) return res.status(200).json(classStudents)
        if (!classStudents) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


getGradeStudents= async (req, res) => {
    try {

        const gradeStudents = await Student.find({grade:req.params.gradeId}).select({grade:0 })

        if (gradeStudents) return res.status(200).json(gradeStudents)
        if (!gradeStudents) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


module.exports = { addStudent, updateStudent , deleteStudent , getStudentById  , getClassStudents , getGradeStudents}