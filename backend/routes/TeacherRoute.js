const express = require("express");
const router = express.Router();

const {createTeacher, getTeachers,updateTeacher,deleteTeacher,getTeacherById} = require("../controllers/TeacherController");

const authMiddleware = require("../middlewares/AuthMiddleware");
const roleMiddleware = require("../middlewares/RoleMiddleware");

router.post("/", authMiddleware, roleMiddleware("SchoolAdmin"), createTeacher);
router.get("/", authMiddleware, roleMiddleware("SchoolAdmin"), getTeachers);
router.get("/:teacherId", authMiddleware, roleMiddleware("SchoolAdmin"), getTeacherById);
router.put("/:teacherId", authMiddleware, roleMiddleware("SuperAdmin", "SchoolAdmin"), updateTeacher);
router.delete("/:teacherId", authMiddleware, roleMiddleware("SuperAdmin", "SchoolAdmin"), deleteTeacher);

module.exports = router;