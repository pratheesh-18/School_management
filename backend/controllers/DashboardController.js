const School = require("../models/School");
const Teacher = require("../models/TeacherModule");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

const getAdminDashboard = async (req, res) => {
  try {
    
    let dashboardData = {};

    const d = new Date();
    const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

   
      dashboardData.totalSchools = await School.countDocuments();
      dashboardData.approvedSchools = await School.countDocuments({ status: "Approved" });
      dashboardData.pendingSchools = await School.countDocuments({ status: "Pending" });
      dashboardData.totalTeachers = await Teacher.countDocuments();
      dashboardData.totalStudents = await Student.countDocuments();
    

    return res.status(200).json({dashboardData,message: "Dashboard data fetched successfully"});
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const getSchoolAdminDashboard = async (req, res) => {
  try {
    
    let dashboardData = {};

    const d = new Date();
    const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      const schoolId = req.user.schoolId;
      dashboardData.totalTeachers = await Teacher.countDocuments({ schoolId });
      dashboardData.totalStudents = await Student.countDocuments({ schoolId });
      dashboardData.todayAttendance = await Attendance.countDocuments({ date: dateString, schoolId });
      dashboardData.presentToday = await Attendance.countDocuments({ date: dateString, status: "Present", schoolId });
      dashboardData.absentToday = await Attendance.countDocuments({ date: dateString, status: "Absent", schoolId });
    
    return res.status(200).json({dashboardData,message: "Dashboard data fetched successfully"});
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
const getTeacherDashboard = async (req, res) => {
  try {
   
    let dashboardData = {};

    const d = new Date();
    const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      const teacher = await Teacher.findOne({ userId: req.user.id });
      if (teacher) {
        dashboardData.totalStudents = await Student.countDocuments({ teacherId: teacher._id });
      } else {
        dashboardData.totalStudents = 0;
      }
   
    return res.status(200).json({dashboardData,message: "Dashboard data fetched successfully"});
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
const getStudentDashboard = async (req, res) => {
  try {
    
    let dashboardData = {};

    const d = new Date();
    const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

   
       dashboardData.todayAttendance = await Attendance.countDocuments({ date: dateString, studentId: req.user._id });
    

    return res.status(200).json({dashboardData,message: "Dashboard data fetched successfully"});
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
 
  getAdminDashboard,
  getSchoolAdminDashboard,
  getTeacherDashboard,
  getStudentDashboard,
};
