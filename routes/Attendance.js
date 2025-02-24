const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Member = require("../models/member");


// ✅ جلب جميع سجلات الحضور
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.findAll({ include: Member });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب سجل حضور معين عبر MemberID
router.get("/:memberID", async (req, res) => {
  try {
    const records = await Attendance.findAll({ 
      where: { MemberID: req.params.memberID },
      include: Member 
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ تسجيل دخول (Check-in)
router.post("/in/:memberID", async (req, res) => {
  try {
    const MemberID = parseInt(req.params.memberID);

    // البحث عن العضو والتحقق من مدة الاشتراك
    const member = await Member.findOne({
      where: { MemberID: MemberID }
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.lesson <= 0) {
      return res.status(400).json({ message: "اشتراكك انتهى، يرجى التجديد" });
    }

    // تقليل مدة الاشتراك بمقدار واحد
    await Member.update(
      { lesson: member.lesson - 1 },
      { where: { MemberID: MemberID } }
    );

    const checkInTime = new Date();
    const checkInRecord = await Attendance.create({
      MemberID,
      CheckInTime: checkInTime.toISOString().split('T')[1], // تخزين الوقت فقط
      Date: checkInTime.toISOString().split('T')[0], // تخزين التاريخ فقط
    });

    res.status(201).json({ message: "تم تسجيل الدخول بنجاح", data: checkInRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ تسجيل خروج (Check-out)
router.post("/out/:memberID", async (req, res) => {
  try {
    const MemberID = req.params.memberID;
    const record = await Attendance.findOne({
      where: { MemberID, CheckOutTime: null },
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
