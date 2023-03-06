const Student = require('../models/student')



const addStudent = async (req, res) => {
    const {
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

        elWasy


    } = req.body

    try {


        if (!name || !email || !password) return res.status(405).json({ msg: 'Some fields are missing' })
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

            elWasy
        }).save()

        if (newStudent) return res.status(201).json(newStudent)
        if (!newStudent) return res.status(404).json({ msg: "An Error Occured" })
    } catch (e) {
        res.status(401).json({ msg: e.message })
    }

}





module.exports = { addStudent }