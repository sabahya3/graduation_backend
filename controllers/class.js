const Class = require('../models/class')
const Grade = require('../models/grade')


const addNewClassToGrade = async (req, res) => {
    const { gradeId, name, subjectToTeacher } = req.body

    try {
        const newClass = await new Class({ name, subjectToTeacher }).save()

        if (newClass) {

            await Grade.updateOne({ _id: gradeId }, { $push: { classes: newClass._id } })

            const createdClass = await Class.find({ _id: newClass._id }).populate('subjectToTeacher.subject')
                .populate('subjectToTeacher.teacher')

            res.status(201).json({ createdClass })
        }
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }

}





const getClassById = async (req, res) => {
    try {

        const selectedClass = await Class.findOne({ _id: req.params.id }).populate('subjectToTeacher.subject')
            .populate('subjectToTeacher.teacher')

        if (selectedClass) return res.status(200).json(selectedClass)
        if (!selectedClass) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


const updateClass = async (req, res) => {
    const { name, subjectToTeacher } = req.body
    try {
        const classId = req.params.id
        const updatedClass = await Class.findOneAndUpdate({ _id: classId }, { $set: { name, subjectToTeacher } }, { new: true }).populate('subjectToTeacher.subject')
            .populate('subjectToTeacher.teacher')
        if (updatedClass) res.status(202).json(updateClass)
    }
    catch (e) {
        res.status(404).json({ msg: `An Error Occured : ${e.message}` })
    }
}


const deleteClass = async (req, res) => {

    try {
        const classId = req.params.id
        const deleted = await Class.deleteOne({ _id: classId })

        if (deleted) return res.status(202).json({ msg: 'class deleted!' })

    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


module.exports = { addNewClassToGrade, getClassById, updateClass, deleteClass }