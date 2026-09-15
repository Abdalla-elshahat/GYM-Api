require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// استيراد جميع المسارات
const memberRoutes = require("./routes/members");
const TrainerRoutes = require("./routes/Trainer");
const AttendanceRoutes = require("./routes/Attendance");
const AttendanceTrainerRoutes = require("./routes/AttendanceTrainer");
const equipmentRoutes = require("./routes/equipment");
const maintenanceRoutes = require("./routes/maintenance");
const MembershipPlanRoutes = require("./routes/MembershipPlan");
const FeedbackRoutes = require("./routes/Feedback");
const ClassRoutes = require("./routes/Class");
const MemberWithClassRoutes = require("./routes/memberwithclass");
const MemberWithTrainerRoutes = require("./routes/memberwithtrainer");

const sequelize = require("./config/db");

// ✅ تحميل ملف العلاقات (ضروري قبل sync)
require("./config/associations");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ إعداد Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gym API",
      version: "1.0.0",
      description: "API documentation for Gym Management System",
    },
    servers: [{ url: `http://localhost:${process.env.PORT}` }],
  },
  apis: ["./routes/*.js", "./swagger/*.js"], // 🔥 تأكد من أن التعليقات التوضيحية موجودة داخل ملفات المسارات وملفات الـ swagger المشتركة
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ ربط المسارات
app.use("/api/members", memberRoutes);
app.use("/api/Attendance", AttendanceRoutes);
app.use("/api/Trainer", TrainerRoutes);
app.use("/api/AttendanceTrainer", AttendanceTrainerRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/MembershipPlan", MembershipPlanRoutes);
app.use("/api/Feedback", FeedbackRoutes);
app.use("/api/class", ClassRoutes);
app.use("/api/MemberWithClass", MemberWithClassRoutes);
app.use("/api/MemberWithTrainer", MemberWithTrainerRoutes);

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

// ✅ Central error handler (used by controller -> service -> repository layers)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message || "Server error" });
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 API Docs available at http://localhost:${PORT}/api-docs`);
});
