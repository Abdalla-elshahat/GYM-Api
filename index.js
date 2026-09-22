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
const ApiError = require("./utils/ApiError");

// ✅ تحميل ملف العلاقات (ضروري قبل sync)
require("./config/associations");

const app = express();

// ✅ Middleware
app.use(express.json());

// Restrict cross-origin access to known frontend origins instead of
// reflecting/allowing every origin. Configure via CORS_ORIGIN (comma-separated)
// in production; defaults to the local Angular dev server.
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:4200")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins,
  })
);

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

// Only expose the API schema/docs outside production — it enumerates every
// resource shape, which is unnecessary surface area to hand out publicly.
if (process.env.NODE_ENV !== "production") {
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

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

  // Only ApiError messages are intentional/safe to show to clients.
  // Anything else (e.g. raw Sequelize/DB errors) may contain internal
  // schema/table/column details, so log it server-side and return a
  // generic message instead of leaking it in the response.
  if (err instanceof ApiError) {
    return res.status(statusCode).json({ error: err.message });
  }

  console.error(err);
  res.status(statusCode).json({ error: "Server error" });
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 API Docs available at http://localhost:${PORT}/api-docs`);
});
