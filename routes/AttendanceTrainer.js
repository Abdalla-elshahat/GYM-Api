const express = require("express");
const router = express.Router();
const AttendanceTrainerController = require("../controllers/AttendanceTrainerController");

/**
 * @swagger
 * tags:
 *   name: attendanceTrainer
 *   description: API for managing attendance records
 */

/**
 * @swagger
 * /api/AttendanceTrainer:
 *   get:
 *     summary: Retrieve all trainer attendance records
 *     tags: [attendanceTrainer]
 *     responses:
 *       200:
 *         description: A list of all trainer attendance records
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", AttendanceTrainerController.getAllAttendance);

/**
 * @swagger
 * /api/AttendanceTrainer/{TrainerID}:
 *   get:
 *     summary: Retrieve trainer attendance record by TrainerID
 *     tags: [attendanceTrainer]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Trainer attendance record retrieved successfully
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:TrainerID", AttendanceTrainerController.getAttendanceByTrainer);

/**
 * @swagger
 * /api/AttendanceTrainer/Date/{date}:
 *   get:
 *     summary: Retrieve trainer attendance records for a specific date
 *     tags: [attendanceTrainer]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema: { type: string, format: date }
 *         description: The date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: A list of trainer attendance records
 *       400:
 *         description: Invalid date format
 *       404:
 *         description: No trainer attendance records found
 */
router.get("/Date/:date", AttendanceTrainerController.getAttendanceByDate);

/**
 * @swagger
 * /api/AttendanceTrainer/range/{startDate}/{endDate}:
 *   get:
 *     summary: Retrieve trainer attendance records between two dates
 *     tags: [attendanceTrainer]
 *     parameters:
 *       - in: path
 *         name: startDate
 *         required: true
 *         schema: { type: string, format: date }
 *       - in: path
 *         name: endDate
 *         required: true
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: A list of trainer attendance records
 */
router.get("/range/:startDate/:endDate", AttendanceTrainerController.getAttendanceByRange);

/**
 * @swagger
 * /api/AttendanceTrainer/in/{trainerID}:
 *   post:
 *     summary: Check-in a trainer
 *     tags: [attendanceTrainer]
 *     parameters:
 *       - in: path
 *         name: trainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       201:
 *         description: Check-in successful
 *       400:
 *         description: Invalid request or already checked in
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/in/:trainerID", AttendanceTrainerController.checkIn);

/**
 * @swagger
 * /api/AttendanceTrainer/out/{trainerID}:
 *   post:
 *     summary: Check-out a trainer
 *     tags: [attendanceTrainer]
 *     parameters:
 *       - in: path
 *         name: trainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Check-out successful
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post("/out/:trainerID", AttendanceTrainerController.checkOut);

module.exports = router;
