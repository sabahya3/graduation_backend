const HomeWork = require('../../models/home_work')

const addHomeWork = async (req, res) => {
    try {
        const { title, desc, classId, grade, subject, teacher } = req.body;
        const newHomeWork = new HomeWork({
            title,
            desc,
            classId,
            grade,
            subject,
            teacher
        });
        const savedHomeWork = await newHomeWork.save();
        res.status(200).json({ msg: 'Added Successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFilteredHomeWorks = async (req, res) => {
    try {
        const { classId, grade, subject } = req.body;

        let query = {}
        if (classId) {
            query.classId = classId
        } else if (grade && subject) {
            query.grade = grade;
            query.subject = subject;
        } else if (grade && subject && classId) {
            query.grade = grade;
            query.subject = subject;
            query.classId = classId

        }
        const homeworks = await HomeWork.find(query).select({updatedAt:0 , __v:0})

        res.status(200).json(homeworks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



const getClassHomeWork = async (req, res) => {
    try {
        const { classId} = req.params;

       
        const homeworks = await HomeWork.find({classId}).select({updatedAt:0 , __v:0}).populate('teacher','name');

        res.status(200).json(homeworks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports={
    getClassHomeWork,
    getFilteredHomeWorks,
    addHomeWork
}