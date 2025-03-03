const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Member = require("../models/member");
const { Op } = require("sequelize");
/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: API for managing attendance records
 */

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     description: Retrieve a list of all attendance records with pagination and sorting.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by (AttendanceID, MemberID, CheckInTime, CheckOutTime, Date)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Sorting order (asc or desc)
 *     responses:
 *       200:
 *         description: A list of attendance records.
 *       500:
 *         description: Server error.
 */
// ✅ جلب جميع سجلات الحضور
router.get("/", async (req, res) => {
  try {
    let { limit = 10, page = 1, sort = "AttendanceID", order = "asc" } = req.query;
    const parsedLimit = parseInt(limit) || 10;
    const parsedPage = parseInt(page) || 1;
    const parsedOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";
    const offset = (parsedPage - 1) * parsedLimit;
    const validSortFields = ["AttendanceID", "MemberID", "CheckInTime", "CheckOutTime", "Date"];
    if (!validSortFields.includes(sort)) {
      return res.status(400).json({ error: "Invalid sort field" });
    }
    const totalCount = await Attendance.count();
    const totalPages = Math.ceil(totalCount / parsedLimit);
    const attendanceRecords = await Attendance.findAll({
      include: Member,
      order: [[sort, parsedOrder]],
      limit: parsedLimit,
      offset: offset,
    });

    res.status(200).json({
      data: attendanceRecords,
      pagination: {
        totalRecords: totalCount,
        totalPages,
        currentPage: parsedPage,
        perPage: parsedLimit,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/attendance/{memberID}:
 *   get:
 *     summary: Get attendance records by MemberID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: Attendance records of the member.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /api/attendance/Date/{date}:
 *   get:
 *     summary: Retrieve attendance records for a specific date
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: A list of attendance records
 *       400:
 *         description: Invalid date format
 *       404:
 *         description: No attendance records found
 */
// ✅ جلب سجل حضور لي يوم معين
router.get("/Date/:date", async (req, res) => {
  try {
    const { date } = req.params;

    // تحقق من صحة التنسيق (اختياري)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }

    const records = await Attendance.findAll({  // استبدل بـ findOne إذا كنت تتوقع سجلًا واحدًا فقط
      where: { Date: date },
      include: [{ model: Member }]  // تأكد من وجود العلاقة في الموديل
    });

    if (!records.length) {
      return res.status(404).json({ message: "No attendance records found for this date." });
    }

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * api/attendance/range/{startDate}/{endDate}:
 *   get:
 *     summary: Retrieve attendance records between two dates
 *     parameters:
 *       - in: path
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: path
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: A list of attendance records
 */
// ✅  جلب جميع الحضور بين تاريخين
router.get("/range/:startDate/:endDate", async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    const records = await Attendance.findAll({
      where: {
        Date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: Member
    });

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/attendance/in/{memberID}:
 *   post:
 *     summary: Check-in a member
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         description: ID of the member
 *     responses:
 *       201:
 *         description: Check-in successful.
 *       400:
 *         description: Already checked in or subscription expired.
 *       500:
 *         description: Server error.
 */
// ✅ تسجيل دخول (Check-in)
router.post("/in/:memberID", async (req, res) => {
  try {
    const MemberID = parseInt(req.params.memberID);
    const today = new Date().toISOString().split('T')[0]; // الحصول على تاريخ اليوم
    const member = await Member.findOne({ where: { MemberID } });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    if (member.lesson <= 0) {
      return res.status(400).json({ message: "اشتراكك انتهى، يرجى التجديد" });
    }
    const existingCheckIn = await Attendance.findOne({
      where: {
        MemberID: MemberID,
        Date: today
      }
    });
    if (existingCheckIn) {
      return res.status(400).json({ message: "لقد قمت بتسجيل الدخول بالفعل اليوم" });
    }
    await Member.update(
      { lesson: member.lesson - 1 },
      { where: { MemberID } }
    );

    const checkInTime = new Date();
    const checkInRecord = await Attendance.create({
      MemberID,
      CheckInTime: checkInTime.toISOString().split('T')[1], // تخزين الوقت فقط
      Date: today, // تخزين التاريخ فقط
    });

    res.status(201).json({ message: "تم تسجيل الدخول بنجاح", data: checkInRecord });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/attendance/out/{memberID}:
 *   post:
 *     summary: Check-out a member
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Check-out successful
 *       404:
 *         description: User or check-in record not found
 */
// ✅ تسجيل خروج (Check-out)
router.post("/out/:memberID", async (req, res) => {
  try {
    const MemberID = parseInt(req.params.memberID);
    const today = new Date().toISOString().split('T')[0]; // تاريخ اليوم فقط

    // البحث عن العضو
    const member = await Member.findByPk(MemberID);
    if (!member) {
      return res.status(404).json({ message: "User not found" });
    }

    // البحث عن سجل الدخول لليوم الحالي بدون تسجيل خروج
    const record = await Attendance.findOne({
      where: { 
        MemberID, 
        CheckOutTime: null, 
        Date: today // استخدام `Date` للتحقق من أن الدخول تم في اليوم نفسه
      },
    });

    if (!record) {
      return res.status(404).json({ message: "No check-in record found for today" });
    }

    // تحديث وقت تسجيل الخروج
    const checkOutTime = new Date();
    record.CheckOutTime = checkOutTime.toISOString().split('T')[1]; // تخزين الوقت فقط
    await record.save();

    res.json({ message: "Checked out successfully", data: record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/attendance/{recordID}:
 *   delete:
 *     summary: Delete an attendance record
 *     parameters:
 *       - in: path
 *         name: recordID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       404:
 *         description: Attendance record not found
 */
// ✅ حذف سجل حضور معين
router.delete("/:recordID", async (req, res) => {
  try {
    const { recordID } = req.params;

    const record = await Attendance.findByPk(recordID);
    if (!record) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    await record.destroy();
    res.json({ message: "Attendance record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
