const Teacher = require('../models/teacher')



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

        const teachers = await Teacher.find({}, { name: 1, imgUrl: 1, phoneNumber: 1, gender: 1, role: 1, email: 1 })

        if (teachers) return res.status(200).json(teachers)
        if (!teachers) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) { res.status(404).json({ msg: "An Error Occured" }) }
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
        const updatedTeacher = await Teacher.findByIdAndUpdat(id, {
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



module.exports={
    addTeacher,
    getAllTeachersNames,
    getAllTeachers,
    deleteTeacher,
    updateTeacher ,
    getTeacherById
}
