require("dotenv").config();
const express = require("express");
const cors = require("cors");
const memberRoutes = require("./routes/members");
const TrainerRoutes = require("./routes/Trainer");
const Attendance= require("./routes/Attendance");
const AttendanceTrainer= require("./routes/AttendanceTrainer");
const equipment= require("./routes/equipment");
const maintenance = require("./routes/maintenance");
const MembershipPlan = require("./routes/MembershipPlan");
const Feedback=require("./routes/Feedback");
const Class=require("./routes/Class");
const sequelize = require("./config/db");
// ✅ تحميل ملف العلاقات (ضروري قبل sync)
require("./config/associations"); 
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// ✅ ربط المسارات
app.use("/api/members", memberRoutes);
app.use("/api/Attendance",Attendance);
app.use("/api/Trainer", TrainerRoutes);
app.use("/api/AttendanceTrainer",AttendanceTrainer);
app.use("/api/equipment", equipment);
app.use("/api/maintenance",maintenance);
app.use("/api/MembershipPlan",MembershipPlan);
app.use("/api/Feedback",Feedback);
app.use("/api/class",Class);

// ✅ مزامنة قاعدة البيانات
(async () => {
  try {
    await sequelize.sync();
    console.log("✅ Database synchronized!");
  } catch (error) {
    console.error("❌ Error synchronizing database:", error);
  }
})();

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
