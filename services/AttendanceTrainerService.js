const AttendanceTrainerRepository = require("../repositories/AttendanceTrainerRepository");
const ApiError = require("../utils/ApiError");

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

class AttendanceTrainerService {
  getAllAttendance() {
    return AttendanceTrainerRepository.findAll();
  }

  getAttendanceByTrainer(trainerId) {
    return AttendanceTrainerRepository.findByTrainerId(trainerId);
  }

  async getAttendanceByDate(date) {
    if (!DATE_FORMAT.test(date)) {
      throw new ApiError(400, "Invalid date format. Use YYYY-MM-DD");
    }
    const records = await AttendanceTrainerRepository.findByDate(date);
    if (!records.length) {
      throw new ApiError(404, "No attendance records found for this date.");
    }
    return records;
  }

  getAttendanceByRange(startDate, endDate) {
    return AttendanceTrainerRepository.findByDateRange(startDate, endDate);
  }

  async checkIn(trainerId) {
    const TrainerID = Number(trainerId);
    if (isNaN(TrainerID)) throw new ApiError(400, "Invalid TrainerID");

    const today = new Date().toISOString().split("T")[0];

    const trainer = await AttendanceTrainerRepository.findTrainerById(TrainerID);
    if (!trainer) throw new ApiError(404, "Trainer not found");

    const existingCheckIn = await AttendanceTrainerRepository.findTodayCheckIn(TrainerID, today);
    if (existingCheckIn) throw new ApiError(400, "لقد قمت بتسجيل الدخول بالفعل اليوم");

    if (trainer.lesson <= 0) throw new ApiError(400, "لا يوجد لديك دروس كافية");

    await AttendanceTrainerRepository.updateTrainerLesson(TrainerID, trainer.lesson + 1);

    const checkInTime = new Date().toISOString().split("T")[1];
    return AttendanceTrainerRepository.createCheckIn({
      TrainerID,
      CheckInTime: checkInTime,
      Date: today,
    });
  }

  async checkOut(trainerId) {
    const TrainerID = parseInt(trainerId);
    const today = new Date().toISOString().split("T")[0];

    const record = await AttendanceTrainerRepository.findOpenCheckIn(TrainerID, today);
    if (!record) throw new ApiError(404, "No check-in record found");

    const checkOutTime = new Date();
    record.CheckOutTime = checkOutTime.toISOString().split("T")[1];
    record.Date = checkOutTime.toISOString().split("T")[0];
    await AttendanceTrainerRepository.save(record);
    return record;
  }
}

module.exports = new AttendanceTrainerService();
