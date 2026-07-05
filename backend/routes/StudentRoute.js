const express = require("express");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController");
const authMiddleware = require("../middlewares/AuthMiddleware");
const roleMiddleware = require("../middlewares/RoleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Teacher"),
  createStudent
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("SchoolAdmin", "Teacher"),
  getStudents
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("SchoolAdmin", "Teacher"),
  getStudentById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("SuperAdmin", "SchoolAdmin", "Teacher"),
  updateStudent
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("SuperAdmin", "SchoolAdmin", "Teacher"),
  deleteStudent
);

module.exports = router;
