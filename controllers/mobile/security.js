const Attendance = require('../../models/attendance')
const Security = require('../../models/security')
const bcrypt = require('bcryptjs')






const takeAttendance = async (req, res) => {
  try {
    const { securityId, studentId, notificationType, message, scanLocation, locationName } = req.body;

    // Validate input
    if (!securityId || !studentId || !notificationType || !scanLocation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get the start and end of the current day
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    // Check if attendance record already exists for the current day
    const existingAttendance = await Attendance.findOne({
      securityId,
      studentId,
      notificationType,
      message,
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    if (existingAttendance) {
      // Attendance record already exists for the current day, update it
      existingAttendance.scanLocation = scanLocation;
      existingAttendance.locationName = locationName;
      await existingAttendance.save();
      return res.status(200).json({ msg: 'Attendance updated successfully' });
    } else {
      // Create new attendance record
      const newAttendance = await Attendance.create({
        securityId,
        studentId,
        notificationType,
        message,
        scanLocation,
        locationName,
      });

      if (newAttendance) {
        return res.status(201).json({ msg: 'Attendance recorded successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to record attendance' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};



getStudentAttendanceNotificationsWithPagination = async (req, res) => {
  const { studentId } = req.body;

  try {


    const result = await Attendance.find({ studentId }).select({ studentId: 0, __v: 0, updatedAt: 0 })
      .populate('securityId', 'name')
      .sort({ createdAt: -1 })

    res.status(200).json(result);
  } catch (e) {

    res.status(500).json({ success: false, message: 'An error occurred while retrieving attendance notifications.' });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Find the student with the provided email
    const security = await Security.findOne({ email }).select({ name: 1, imgUrl: 1, email: 1, password: 1 })

    // If no student found, send an error response
    if (!security) {
      return res.status(400).json({ message: 'Security not found' })
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, security.password)

    // If the passwords don't match, send an error response
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // If the passwords match, send a success response
    res.status(200).json({ id: security._id, name: security.name, image: security.imgUrl })
  } catch (error) {
    // If there's an error, send an error response
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
module.exports = {
  takeAttendance,
  getStudentAttendanceNotificationsWithPagination,
  login
}