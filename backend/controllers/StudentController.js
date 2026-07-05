const Student = require("../models/Student");
const User = require("../models/User");
const Teacher = require("../models/TeacherModule");
const bcrypt = require("bcryptjs");

const createStudent = async (req, res) => {
  const { name, email, password, className, section, rollNo, phone } = req.body;
  
  try {
    if (!name || !email || !password || !className || !section || !rollNo) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Student",
      schoolId: req.user.schoolId,
    });

    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
      return res.status(403).json({ message: "Only teachers can enroll students" });
    }

    const newStudent = await Student.create({
      userId: newUser._id,
      className,
      section,
      rollNo,
      phone,
      schoolId: req.user.schoolId,
      teacherId: teacher._id,
    });

    return res.status(201).json({ 
      message: "Student created successfully", 
      student: newStudent 
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const getStudents = async (req, res) => {
  try {
    let query = { schoolId: req.user.schoolId };
    
    if (req.user.role === "Teacher") {
      const teacher = await Teacher.findOne({ userId: req.user.id });
      if (teacher) {
        query.teacherId = teacher._id;
      }
    }

    const students = await Student.find(query)
      .populate("userId", "name email");
      
    return res.status(200).json({ students: students || [], message: "Students fetched successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id).populate("userId", "name email");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ student, message: "Student fetched successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, className, section, rollNo, phone } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(
      student.userId,
      { name, email },
      { new: true }
    );

    student.className = className || student.className;
    student.section = section || student.section;
    student.rollNo = rollNo || student.rollNo;
    student.phone = phone || student.phone;

    await student.save();

    const updatedStudent = await Student.findById(id).populate("userId", "name email");

    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndDelete(student.userId);
    await Student.findByIdAndDelete(id);

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
