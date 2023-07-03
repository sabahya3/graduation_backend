TeacherStudentChat = require('../../models/teacher_student_chat');

const createMsgAsATeacher = async (req, res) => {
    const { studentId, teacherId, msg } = req.body;

    const newChat = new TeacherStudentChat({
        studentId,
        teacherId,
        isTeacher: true,
        msg
    });

    newChat.save()
        .then(savedChat => {
            const { isTeacher, msg, createdAt, _id } = savedChat;

            res.status(201).json({ _id,msg,isTeacher, createdAt });
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while creating the chat.' });
        });
};


const createMsgAsStudent = async (req, res) => {
    const { studentId, teacherId, msg } = req.body;

    const newChat = new TeacherStudentChat({
        studentId,
        teacherId,
        isTeacher: false,
        msg
    });

    newChat.save()
    .then(savedChat => {
        const { isTeacher, msg, createdAt, _id } = savedChat;

        res.status(201).json({ _id,msg,isTeacher, createdAt });
    })
    .catch(error => {
        res.status(500).json({ error: 'An error occurred while creating the chat.' });
    });
};


const getMessagesWithPagination = async (req, res) => {
    const { teacherId, studentId, page } = req.body;
    const pageNumber = parseInt(page) || 1;
    const pageSize = 10;
  
    try {
      const totalMessages = await TeacherStudentChat.countDocuments({ studentId, teacherId });
      const messages = await TeacherStudentChat.find({ studentId, teacherId })
        .skip((pageNumber - 1) * pageSize)
        .select({ updatedAt: 0, __v: 0, studentId: 0, teacherId: 0 })
        .limit(pageSize)
        .sort({ createdAt: -1 });
  
      const totalPages = Math.ceil(totalMessages / pageSize);
  
      res.status(200).json({
        messages,
        currentPage: pageNumber,
        totalPages
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the messages.' });
    }
  };
  


module.exports = {
    createMsgAsATeacher,
    createMsgAsStudent ,
    getMessagesWithPagination
}