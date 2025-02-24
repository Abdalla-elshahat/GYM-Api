require("dotenv").config();
const express = require("express");
const router = express.Router();
const Member = require("../models/member.js");
const verfiytoken=require("../config/verfiytoken.js")
const bcrypt=require("bcrypt")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const generateJWT = require("../config/generateJWT.js");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const { Op, QueryTypes } = require("sequelize");
router.post("/signup", async (req, res) => {
  try {
    const {FirstName,LastName , email, password } = req.body;
    const existingUser = await Member.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Member.create({
     FirstName,
     LastName,
     email,
     password: hashedPassword,
    });

    const token = generateJWT({
      email: newUser.email,
      id: newUser.MemberID,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.MemberID,
        username: newUser.FirstName +newUser.LastName ,
        email: newUser.email,
        token
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});
router.post("/login", async (req, res) => {
  try {
    if (req.cookies.token) {
      const decoded = verifyJWT(req.cookies.token); // دالة للتحقق من صحة التوكن
      if (decoded) {
        return res.status(400).json({ message: "You are already logged in" ,token:req.cookies.token});
      }
    }
    const { email, password } = req.body;
    const user = await Member.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateJWT({
      id: user.MemberID,
      email: user.email,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});
// ✅ حذف الحساب
router.delete("/delete_data", async (req, res) => {
  try {
    const deletedUser = await Member.findByPk(req.user.id);
    if (!deletedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Failed to delete user",
      error: error.message,
    });
  }
});
//update pass
router.patch("/update_pass", verfiytoken, async (req, res) => {
  const  user_id  = req.user.id;
  const { old_pass, new_pass, confirm_pass } = req.body;
  try {
    const user = await logins.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(old_pass, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "The old password is incorrect" });
    }
    if (new_pass !== confirm_pass) {
      return res.status(400).json({
        message: "The new password and confirmation password do not match",
      });
    }
    const hashedPassword = await bcrypt.hash(new_pass, 10);
    const updatedUser = await logins.findByIdAndUpdate(
      user_id,
      { $set: { password: hashedPassword } },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Password updated successfully",
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to update password",
      error: error.message,
    });
  }
});
router.post("/logout", (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(400).json({ message: "No token found in cookies" });
    }
    // Clear the token cookie
    res.clearCookie("token", { httpOnly: true, secure: true }); // Ensure secure cookie handling in production
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "An error occurred during logout" });
  }
});
router.get("/alldata", async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Member.findByPk(userId, { __v: false, password: false });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});