const AttendanceTrainerService = require("../services/AttendanceTrainerService");

const getAllAttendance = async (req, res, next) => {
  try {
    const records = await AttendanceTrainerService.getAllAttendance();
    res.status(200).json(records);
  } catch (err) {
    next(err);
  }
};

const getAttendanceByTrainer = async (req, res, next) => {
  try {
    const record = await AttendanceTrainerService.getAttendanceByTrainer(req.params.TrainerID);
    res.json(record);
  } catch (err) {
    next(err);
  }
};

const getAttendanceByDate = async (req, res, next) => {
  try {
    const records = await AttendanceTrainerService.getAttendanceByDate(req.params.date);
    res.json(records);
  } catch (err) {
    next(err);
  }
};

const getAttendanceByRange = async (req, res, next) => {
  try {
    const records = await AttendanceTrainerService.getAttendanceByRange(
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
    const record = await AttendanceTrainerService.checkIn(req.params.trainerID);
    res.status(201).json({ message: "Checked in successfully", data: record });
  } catch (err) {
    next(err);
  }
};

const checkOut = async (req, res, next) => {
  try {
    const record = await AttendanceTrainerService.checkOut(req.params.trainerID);
    res.json({ message: "Checked out successfully", data: record });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAttendance,
  getAttendanceByTrainer,
  getAttendanceByDate,
  getAttendanceByRange,
  checkIn,
  checkOut,
};
