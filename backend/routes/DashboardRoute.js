const express = require("express");
const { getAdminDashboard,getSchoolAdminDashboard,getTeacherDashboard,getStudentDashboard } = require("../controllers/DashboardController");
const authMiddleware = require("../middlewares/AuthMiddleware");
const roleMiddleware = require("../middlewares/RoleMiddleware");

const router = express.Router();

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("SuperAdmin"),
  getAdminDashboard
);
router.get(
  "/school-admin",
  authMiddleware,
  roleMiddleware("SchoolAdmin"),
  getSchoolAdminDashboard
);
router.get(
  "/teacher",
  authMiddleware,
  roleMiddleware("Teacher"),
  getTeacherDashboard
);
router.get(
  "/student",
  authMiddleware,
  roleMiddleware("Student"),
  getStudentDashboard
);
  
module.exports = router;
