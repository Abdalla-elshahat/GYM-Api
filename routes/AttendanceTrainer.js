const express = require("express");
const router = express.Router();
const AttendanceTrainer = require("../models/AttendanceTrainer");
const Trainer = require("../models/Trainer");


// ✅ جلب جميع سجلات الحضور
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await AttendanceTrainer.findAll({ include: Trainer });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب سجل حضور لي يوم معين
router.get("/Date/:date", async (req, res) => {
  try {
    const { date } = req.params;

    // تحقق من صحة التنسيق (اختياري)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }

    const records = await AttendanceTrainer.findAll({  // استبدل بـ findOne إذا كنت تتوقع سجلًا واحدًا فقط
      where: { Date: date },
      include: [{ model: Trainer }]  // تأكد من وجود العلاقة في الموديل
    });

    if (!records.length) {
      return res.status(404).json({ message: "No attendance records found for this date." });
    }

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب سجل حضور معين عبر TrainerID
router.get("/:TrainerID", async (req, res) => {
  try {
    const records = await AttendanceTrainer.findOne({ 
      where: { TrainerID: req.params.TrainerID },
      include:Trainer
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ تسجيل دخول (Check-in)
router.post("/in/:trainerID", async (req, res) => {
  try {
    const TrainerID = parseInt(req.params.trainerID);
    const checkInTime = new Date();  // الحصول على الوقت والتاريخ الحالي
    const checkInRecord = await AttendanceTrainer.create({
      TrainerID,
      CheckInTime: checkInTime.toISOString().split('T')[1],  // استخدام الوقت الحالي
      Date: checkInTime.toISOString().split('T')[0],  // تخزين التاريخ فقط
    });
    res.status(201).json({ message: "Checked in successfully", data: checkInRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ تسجيل خروج (Check-out)
router.post("/out/:trainerID", async (req, res) => {
  try {
    const trainerID = req.params.trainerID;
    const record = await AttendanceTrainer.findOne({
      where: { trainerID, CheckOutTime: null },
    });

    if (!record) {
      return res.status(404).json({ message: "No check-in record found" });
    }

    const checkOutTime = new Date();  // الحصول على الوقت الحالي عند الخروج
    record.CheckOutTime = checkOutTime.toISOString().split('T')[1];
    record.Date = checkOutTime.toISOString().split('T')[0];
    await record.save();
    
    res.json({ message: "Checked out successfully", data: record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
