const School=require("../models/School");
const User=require("../models/User");
const bcrypt = require("bcrypt");


const createSchoolAdmin=async(req,res)=>{
    const {schoolName,principalName,email,password,phone,address}=req.body;
    console.log(req.body);
console.log(req.user);
    try{
        if(!email || !password || !schoolName || !principalName || !phone || !address){
            return res.status(400).json({message:"Please fill all required fields"});
        }
        
        const isUserExist=await User.findOne({email:email});
        if(isUserExist){
            return res.status(400).json({message:"User with this email already exists"});
        }
        
        const isSchoolExist=await School.findOne({email:email});
        if(isSchoolExist){
            return res.status(400).json({message:"School with this email already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
    
        const newSchool=await School.create({
            schoolName,
            principalName,
            email,
            phone,
            address,
            createdBy: req.user ? req.user._id : null
        });

        const newUser=await User.create({
            name: principalName,
            email,
            password: hashedPassword,
            role:"SchoolAdmin",
            schoolId: newSchool._id
        });
        
        return res.status(201).json({message:"School and admin created successfully", user: newUser, school: newSchool});
    } catch (err) {
        return res.status(500).json({message:err.message || "Internal Server Error"});
    }
}

const createSchool=async(req,res)=>{
    const {schoolName,principalName,email,phone,address}=req.body;
    try{
        if(!email || !schoolName || !principalName || !phone || !address){
            return res.status(400).json({message:"Please fill all required fields"});
        }
        const isSchoolExist=await School.findOne({email:email});
        if(isSchoolExist){
            return res.status(400).json({message:"School already exists"});
        }
        
        
        const newSchool=await School.create({
            schoolName,
            principalName,
            email,
            phone,
            address
            
        })
        return res.status(201).json({message:"School created successfully", school: newSchool});
    } catch (err) {
        return res.status(500).json({message:err.message || "Internal Server Error"});
    }
}

const getSchools=async(req,res)=>{
    try{
        const schools=await School.find();
        if(!schools || schools.length===0){
            return res.status(404).json({message:"No schools found"});
        }
        return res.status(200).json({schools, message:"Schools fetched successfully"});
    }
    catch(err){
        return res.status(500).json({message:err.message || "Internal Server Error"});
    }
}

const approveSchool=async(req,res)=>{
    const {schoolId}=req.params;
    try{
        const school=await School.findByIdAndUpdate(
            schoolId,
            {status:"Approved"},
            {new:true}

        )
        if(!school){   
            return res.status(404).json({message:"School not found"});
        }
        return res.status(200).json({school, message:"School approved successfully"});
    }
    catch(err){
        return res.status(500).json({message:err.message || "Internal Server Error"});
    }
}

const rejectSchool = async (req, res) => {
    const { schoolId } = req.params;
    try {
        const school = await School.findByIdAndUpdate(
            schoolId,
            { status: "Rejected" },
            { new: true }
        );
        if (!school) {
            return res.status(404).json({ message: "School not found" });
        }
        return res.status(200).json({ school, message: "School rejected successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};

module.exports = { createSchoolAdmin, createSchool, getSchools, approveSchool, rejectSchool };