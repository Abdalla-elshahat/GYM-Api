const AttendanceService = require("../services/AttendanceService");

const getAllAttendance = async (req, res, next) => {
  try {
    const result = await AttendanceService.getAllAttendance(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getAttendanceByMember = async (req, res, next) => {
  try {
    const records = await AttendanceService.getAttendanceByMember(req.params.memberID);
    res.json(records);
  } catch (err) {
    next(err);
  }
};

const getAttendanceByDate = async (req, res, next) => {
  try {
    const records = await AttendanceService.getAttendanceByDate(req.params.date);
    res.json(records);
  } catch (err) {
    next(err);
  }
};

const getAttendanceByRange = async (req, res, next) => {
  try {
    const records = await AttendanceService.getAttendanceByRange(
      req.params.startDate,
      req.params.endDate
    );
    res.json(records);
  } catch (err) {
    next(err);
  }
};

const checkIn = async (req, res, next) => {
  try {
    const record = await AttendanceService.checkIn(req.params.memberID);
    res.status(201).json({ message: "تم تسجيل الدخول بنجاح", data: record });
  } catch (err) {
    next(err);
  }
};

const checkOut = async (req, res, next) => {
  try {
    const record = await AttendanceService.checkOut(req.params.memberID);
    res.json({ message: "Checked out successfully", data: record });
  } catch (err) {
    next(err);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    await AttendanceService.deleteAttendance(req.params.recordID);
    res.json({ message: "Attendance record deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAttendance,
  getAttendanceByMember,
  getAttendanceByDate,
  getAttendanceByRange,
  checkIn,
  checkOut,
  deleteAttendance,
};
