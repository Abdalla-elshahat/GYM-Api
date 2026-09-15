const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController");

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: API for managing attendance records
 */

/**
 * @swagger
 * /api/Attendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     description: Retrieve a list of all attendance records with pagination and sorting.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         description: Number of records per page
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *         description: Page number
 *       - in: query
 *         name: sort
 *         schema: { type: string }
 *         description: Field to sort by (AttendanceID, MemberID, CheckInTime, CheckOutTime, Date)
 *       - in: query
 *         name: order
 *         schema: { type: string }
 *         description: Sorting order (asc or desc)
 *     responses:
 *       200:
 *         description: A list of attendance records.
 *       400:
 *         description: Invalid sort field.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", AttendanceController.getAllAttendance);

/**
 * @swagger
 * /api/Attendance/{memberID}:
 *   get:
 *     summary: Get attendance records by MemberID
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Attendance records of the member.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:memberID", AttendanceController.getAttendanceByMember);

/**
 * @swagger
 * /api/Attendance/Date/{date}:
 *   get:
 *     summary: Retrieve attendance records for a specific date
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema: { type: string, format: date }
 *         description: The date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: A list of attendance records
 *       400:
 *         description: Invalid date format
 *       404:
 *         description: No attendance records found
 */
router.get("/Date/:date", AttendanceController.getAttendanceByDate);

/**
 * @swagger
 * /api/Attendance/range/{startDate}/{endDate}:
 *   get:
 *     summary: Retrieve attendance records between two dates
 *     tags: [Attendance]
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
 *         description: A list of attendance records
 */
router.get("/range/:startDate/:endDate", AttendanceController.getAttendanceByRange);

/**
 * @swagger
 * /api/Attendance/in/{memberID}:
 *   post:
 *     summary: Check-in a member
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       201:
 *         description: Check-in successful.
 *       400:
 *         description: Already checked in or subscription expired.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/in/:memberID", AttendanceController.checkIn);

/**
 * @swagger
 * /api/Attendance/out/{memberID}:
 *   post:
 *     summary: Check-out a member
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Check-out successful
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post("/out/:memberID", AttendanceController.checkOut);

/**
 * @swagger
 * /api/Attendance/{recordID}:
 *   delete:
 *     summary: Delete an attendance record
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: recordID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete("/:recordID", AttendanceController.deleteAttendance);

module.exports = router;
