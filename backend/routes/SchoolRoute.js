const express = require("express");

const router = express.Router();

const {
  createSchoolAdmin,
  createSchool,
  getSchools,
  approveSchool,
  rejectSchool
} = require("../controllers/SchoolController");

const authMiddleware = require("../middlewares/AuthMiddleware");
const roleMiddleware = require("../middlewares/RoleMiddleware");

router.post("/", authMiddleware, roleMiddleware("SuperAdmin"), createSchoolAdmin);
router.post("/setup", authMiddleware, roleMiddleware("SchoolAdmin"), createSchool);
router.get("/", authMiddleware, roleMiddleware("SuperAdmin"), getSchools);

router.put("/approve/:schoolId", authMiddleware, roleMiddleware("SuperAdmin"), approveSchool);
router.put("/reject/:schoolId", authMiddleware, roleMiddleware("SuperAdmin"), rejectSchool);

module.exports = router;
