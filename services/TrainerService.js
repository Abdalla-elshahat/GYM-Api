const TrainerRepository = require("../repositories/TrainerRepository");
const ApiError = require("../utils/ApiError");

class TrainerService {
  getAllTrainers(q) {
    return TrainerRepository.findAll(q);
  }

  async getTrainerById(id) {
    const trainer = await TrainerRepository.findById(id);
    if (!trainer) throw new ApiError(404, "Trainer not found");
    return trainer;
  }

  createTrainer(data) {
    return TrainerRepository.create({ HireDate: new Date(), ...data });
  }

  async updateTrainer(id, data) {
    const trainer = await TrainerRepository.findById(id);
    if (!trainer) throw new ApiError(404, "Trainer not found");
    await TrainerRepository.update(trainer, data);
    return trainer;
  }

  async deleteTrainer(id) {
    const deleted = await TrainerRepository.delete(id);
    if (!deleted) throw new ApiError(404, "Trainer not found");
  }

  async getTrainerClasses(id) {
    const classes = await TrainerRepository.findClassesByTrainerId(id);
    if (!classes.length) throw new ApiError(404, "No classes found for this trainer");
    return classes;
  }

  async getTrainerMembers(id) {
    const trainer = await TrainerRepository.findWithMembers(id);
    if (!trainer) throw new ApiError(404, "Trainer not found");
    return trainer;
  }

  async getTrainerSalary(id) {
    const trainer = await TrainerRepository.findById(id);
    if (!trainer) throw new ApiError(404, "Trainer not found");

    const salaryofclasses = await trainer.getSalary();
    const fixedsalary = trainer.fixedsalary * trainer.lesson;

    return {
      salaryofclasses,
      fixedsalary,
      totalSalary: salaryofclasses + fixedsalary,
    };
  }
}

module.exports = new TrainerService();
