const Subject = require('../models/subject')



const addSubject = async (req, res) => {
    try {
        const name = req.body.name
        if (!name) return res.status(405).json({ msg: 'Subject name is required!' })
        const newSubject = await new Subject({ name }).save()

        if (newSubject) return res.status(201).json(newSubject)
        if (!newSubject) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}

const getAllSubjects = async (req, res) => {
    try {

        const subjects = await Subject.find({})

        if (subjects) return res.status(200).json(subjects)
        if (!subjects) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}


const deleteSubject = async (req, res) => {

    try {
        const id = req.params.id
        const deleted = await Subject.deleteOne({_id:id })

        if (deleted) return res.status(202 ).json({msg:'deleted'})

    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
}



module.exports = {
    addSubject,
    getAllSubjects,
    deleteSubject
}