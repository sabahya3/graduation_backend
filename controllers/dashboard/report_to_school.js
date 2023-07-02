
const SchoolChat = require('../../models/school_chat')
const SchoolInbox = require('../../models/school_inbox')

const createNewMsgAsAStudent = async (req, res) => {
    const { studentId, msg } = req.body;
  
    try {
      // Create a new message in SchoolChat collection
      const newMsg = new SchoolChat({
        studentId,
        isAdmin: false,
        msg
      });
      await newMsg.save();
  
      // Check if the student already exists in SchoolInbox collection
      const existingInbox = await SchoolInbox.exists({ studentId });
  
      // Add studentId to SchoolInbox if it doesn't exist already
      if (!existingInbox) {
        await SchoolInbox.create({ studentId });
      }
  
      res.status(200).json({
        message: 'Message created successfully',
        newMsg: {
          msgTxt: newMsg.msg,
          isAdmin: newMsg.isAdmin,
          createdAt: newMsg.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create message' });
    }
  };
  
  const createMsgAsAdmin = async (req, res) => {
    const { studentId, msg } = req.body;
  
    try {
      // Create a new message in SchoolChat collection
      const newMsg = new SchoolChat({
        studentId,
        isAdmin: true,
        msg
      });
      await newMsg.save();
  
      res.status(200).json({
        message: 'Message created successfully',
        newMsg: {
          msgTxt: newMsg.msg,
          isAdmin: newMsg.isAdmin,
          createdAt: newMsg.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create message' });
    }
  };

  

  const getAllMsgsWithPaginationByStudentId = async (req, res) => {
    const { studentId, page } = req.body;
  
    const pageNumber = parseInt(page) || 1;
    const pageSize = 10;
  
    try {
      // Retrieve messages with pagination
      const messages = await SchoolChat.find({ studentId }).select({updatedAt:0,__v:0 , studentId:0})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ createdAt: -1 });
  
      // Count total number of messages for the student
      const totalMessages = await SchoolChat.countDocuments({ studentId });
  
      res.status(200).json({
        messages,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalMessages / pageSize)
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  };
  

  const getSchoolInbox = async (req, res) => {
    try {
      // Retrieve the school inbox and populate the studentId field with name and imgUrl
      const inbox = await SchoolInbox.find({})
        .populate({
          path: 'studentId',
          select: 'name imgUrl'
        })
        .lean(); // Convert the query result to plain JavaScript objects
  
      // Extract the desired fields and create a new array with the modified structure
      const modifiedInbox = inbox.map((item) => ({
        _id: item._id,
        studentId: item.studentId._id,
        name: item.studentId.name,
        imgUrl: item.studentId.imgUrl
      }));
  
      res.status(200).json( modifiedInbox );
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve school inbox' });
    }
  };
  
  

  module.exports={
    createMsgAsAdmin,
    createNewMsgAsAStudent,
    getAllMsgsWithPaginationByStudentId,
    getSchoolInbox
  }