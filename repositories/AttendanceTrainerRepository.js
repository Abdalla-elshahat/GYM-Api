const AttendanceTrainer = require("../models/AttendanceTrainer");
const Trainer = require("../models/Trainer");
const { Op } = require("sequelize");

class AttendanceTrainerRepository {
  findAll() {
    return AttendanceTrainer.findAll({ include: Trainer });
  }

  findByTrainerId(trainerId) {
    return AttendanceTrainer.findOne({ where: { TrainerID: trainerId }, include: Trainer });
  }

  findByDate(date) {
    return AttendanceTrainer.findAll({ where: { Date: date }, include: [{ model: Trainer }] });
  }

  findByDateRange(startDate, endDate) {
    return AttendanceTrainer.findAll({
      where: { Date: { [Op.between]: [startDate, endDate] } },
      include: Trainer,
    });
  }

  findTrainerById(trainerId) {
    return Trainer.findOne({ where: { TrainerID: trainerId } });
  }

  updateTrainerLesson(trainerId, lesson) {
    return Trainer.update({ lesson }, { where: { TrainerID: trainerId } });
  }

  findTodayCheckIn(trainerId, date) {
    return AttendanceTrainer.findOne({ where: { TrainerID: trainerId, Date: date } });
  }

  createCheckIn(data) {
    return AttendanceTrainer.create(data);
  }

  findOpenCheckIn(trainerId, date) {
    return AttendanceTrainer.findOne({
      where: { trainerID: trainerId, CheckOutTime: null, Date: date },
    });
  }

  save(record) {
    return record.save();
  }
}

module.exports = new AttendanceTrainerRepository();
