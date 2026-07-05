const express = require("express");
const {
  markAttendance,
  getAllAttendance,
  getStudentAttendance,
  getMyAttendance,
} = require("../controllers/AttendanceController");
const authMiddleware = require("../middlewares/AuthMiddleware");
const roleMiddleware = require("../middlewares/RoleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("Teacher"), markAttendance);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  getAllAttendance,
);

router.get(
  "/student/:studentId",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  getStudentAttendance,
);

router.get("/my", authMiddleware, roleMiddleware("Student"), getMyAttendance);

module.exports = router;
