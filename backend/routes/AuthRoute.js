const express=require("express");
const router=express.Router();
const {register,login, updateProfile}=require("../controllers/AuthController");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/register",register);
router.post("/login",login);
router.put("/profile", authMiddleware, updateProfile);

module.exports=router;