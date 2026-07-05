const Teacher = require("../models/TeacherModule");
const User = require("../models/User");

const bcrypt = require("bcryptjs");

const createTeacher = async (req, res) => {
  const { name, email, password, phone, subject, qualification,gender } = req.body;
  try {
    if (!name || !email || !password || !phone || !subject) {
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
      role: "Teacher",
      schoolId: req.user.schoolId,
    });

    const newTeacher = await Teacher.create({
      userId: newUser._id,
      phone,
      subject,
      qualification,
      gender,
      schoolId: req.user.schoolId,
    });

    return res
      .status(201)
      .json({ message: "Teacher created successfully", teacher: newTeacher });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({
      schoolId: req.user.schoolId,
    }).populate("userId", "name email");

    return res
      .status(200)
      .json({ teachers: teachers || [], message: "Teachers fetched successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTeacherById = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findById(teacherId).populate(
      "userId",
      "name email",
    );
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    return res
      .status(200)
      .json({ teacher, message: "Teacher fetched successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTeacher = async (req, res) => {
  const { teacherId } = req.params;

  const { name, email, phone, subject, qualification } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    await User.findByIdAndUpdate(
      teacher.userId,
      {
        name,
        email,
      },
      { new: true },
    );

    teacher.phone = phone;
    teacher.subject = subject;
    teacher.qualification = qualification;

    await teacher.save();

  
    const updatedTeacher = await Teacher.findById(teacherId).populate(
      "userId",
      "name email",
    );

    return res.status(200).json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteTeacher = async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    await User.findByIdAndDelete(teacher.userId);
    await teacher.remove();
    return res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
