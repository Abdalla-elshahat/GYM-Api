const express = require("express");
const router = express.Router();
const AttendanceTrainer = require("../models/AttendanceTrainer");
const Trainer = require("../models/Trainer");
const { Op } = require("sequelize");
/**
 * @swagger
 * tags:
 *   name: attendanceTrainer
 *   description: API for managing attendance records
 */

/**
 * @swagger
 * /api/attendanceTrainer/:
 *   get:
 *     summary: Retrieve all trainer attendance records
 *     responses:
 *       200:
 *         description: A list of all trainer attendance records
 *       500:
 *         description: Server error
 */
// ✅ جلب جميع سجلات الحضور
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await AttendanceTrainer.findAll({ include: Trainer });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/attendanceTrainer/{TrainerID}:
 *   get:
 *     summary: Retrieve trainer attendance record by TrainerID
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trainer attendance record retrieved successfully
 *       404:
 *         description: Trainer attendance record not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/attendanceTrainer/Date/{date}:
 *   get:
 *     summary: Retrieve trainer attendance records for a specific date
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
 *         description: A list of trainer attendance records
 *       400:
 *         description: Invalid date format
 *       404:
 *         description: No trainer attendance records found
 */
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

/**
 * @swagger
 * /api/attendanceTrainer/range/{startDate}/{endDate}:
 *   get:
 *     summary: Retrieve trainer attendance records between two dates
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
 *         description: A list of trainer attendance records
 */
// ✅  جلب جميع الحضور بين تاريخين
router.get("/range/:startDate/:endDate", async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    const records = await AttendanceTrainer.findAll({
      where: {
        Date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include:Trainer
    });

    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/attendanceTrainer/in/{trainerID}:
 *   post:
 *     summary: Check-in a trainer
 *     parameters:
 *       - in: path
 *         name: trainerID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Check-in successful
 *       400:
 *         description: Invalid request or already checked in
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */
// ✅ تسجيل دخول (Check-in)
router.post("/in/:trainerID", async (req, res) => {
  try {
    // ✅ تحويل trainerID إلى رقم والتأكد من صحته
    const TrainerID = Number(req.params.trainerID);
    if (isNaN(TrainerID)) {
      return res.status(400).json({ message: "Invalid TrainerID" });
    }

    const today = new Date().toISOString().split('T')[0]; 

    // ✅ التحقق من وجود المدرب
    const trainer = await Trainer.findOne({ where: { TrainerID } });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // ✅ التحقق مما إذا كان المدرب قد قام بـ Check-in اليوم
    const existingCheckIn = await AttendanceTrainer.findOne({
      where: { TrainerID, Date: today }
    });

    if (existingCheckIn) {
      return res.status(400).json({ message: "لقد قمت بتسجيل الدخول بالفعل اليوم" });
    }

    // ✅ تقليل عدد الدروس إذا كان يمتلك دروسًا كافية
    if (trainer.lesson <= 0) {
      return res.status(400).json({ message: "لا يوجد لديك دروس كافية" });
    }

    await Trainer.update(
      { lesson: trainer.lesson +1 },
      { where: { TrainerID } }
    );

    const checkInTime = new Date().toISOString().split('T')[1]; // ✅ تخزين الوقت فقط

    // ✅ تسجيل الحضور
    const checkInRecord = await AttendanceTrainer.create({
      TrainerID,
      CheckInTime: checkInTime,
      Date: today,
    });

    res.status(201).json({ message: "Checked in successfully", data: checkInRecord });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/attendanceTrainer/out/{trainerID}:
 *   post:
 *     summary: Check-out a trainer
 *     parameters:
 *       - in: path
 *         name: trainerID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Check-out successful
 *       404:
 *         description: Trainer or check-in record not found
 */
// ✅ تسجيل خروج (Check-out)
router.post("/out/:trainerID", async (req, res) => {
  try {
    const trainerID =parseInt(req.params.trainerID);
    const today = new Date().toISOString().split('T')[0]; 
    const record = await AttendanceTrainer.findOne({
      where: { trainerID, CheckOutTime: null,Date:today },
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
