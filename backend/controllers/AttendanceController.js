const Attendance = require("../models/Attendance");
const Teacher = require("../models/TeacherModule");
const Student = require("../models/Student");

const markAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;

  try {
    if (!studentId || !date || !status) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const existingAttendance = await Attendance.findOne({
      studentId,
      date,
    });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      return res.status(200).json({
        message: "Attendance updated successfully",
        attendance: existingAttendance,
      });
    }

    const newAttendance = await Attendance.create({
      studentId,
      teacherId: teacher._id,
      date,
      status,
      schoolId: req.user.schoolId,
    });

    return res.status(201).json({
      message: "Attendance marked successfully",
      attendance: newAttendance,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ schoolId: req.user.schoolId })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "teacherId", populate: { path: "userId", select: "name email" } });

    return res.status(200).json({
      attendance: attendanceRecords,
      message: "Attendance fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const getStudentAttendance = async (req, res) => {
  const { studentId } = req.params;
  try {
    const attendanceRecords = await Attendance.find({ studentId })
      .populate({ path: "teacherId", populate: { path: "userId", select: "name" } });

    if (!attendanceRecords) {
      return res.status(404).json({ message: "No attendance found for this student" });
    }

    return res.status(200).json({
      attendance: attendanceRecords,
      message: "Student attendance fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const getMyAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const attendanceRecords = await Attendance.find({ studentId: student._id })
      .populate({ path: "teacherId", populate: { path: "userId", select: "name" } });

    return res.status(200).json({
      attendance: attendanceRecords,
      message: "Your attendance fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  markAttendance,
  getAllAttendance,
  getStudentAttendance,
  getMyAttendance,
};
