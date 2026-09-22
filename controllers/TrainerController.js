const TrainerService = require("../services/TrainerService");

const getAllTrainers = async (req, res, next) => {
  try {
    const trainers = await TrainerService.getAllTrainers(req.query.q);
    res.status(200).json(trainers);
  } catch (err) {
    next(err);
  }
};

const getTrainerById = async (req, res, next) => {
  try {
    const trainer = await TrainerService.getTrainerById(req.params.TrainerID);
    res.status(200).json(trainer);
  } catch (err) {
    next(err);
  }
};

const createTrainer = async (req, res, next) => {
  try {
    const trainer = await TrainerService.createTrainer(req.body);
    res.status(201).json({ Trainer: trainer, message: "Trainer added successfully" });
  } catch (err) {
    next(err);
  }
};

const updateTrainer = async (req, res, next) => {
  try {
    await TrainerService.updateTrainer(req.params.TrainerID, req.body);
    res.status(200).json({ message: "Trainer updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteTrainer = async (req, res, next) => {
  try {
    await TrainerService.deleteTrainer(req.params.TrainerID);
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getTrainerClasses = async (req, res, next) => {
  try {
    const classes = await TrainerService.getTrainerClasses(req.params.TrainerID);
    res.status(200).json(classes);
  } catch (err) {
    next(err);
  }
};

const getTrainerMembers = async (req, res, next) => {
  try {
    const trainer = await TrainerService.getTrainerMembers(req.params.TrainerID);
    res.status(200).json(trainer);
  } catch (err) {
    next(err);
  }
};

const getTrainerSalary = async (req, res, next) => {
  try {
    const salary = await TrainerService.getTrainerSalary(req.params.TrainerID);
    res.status(200).json(salary);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerClasses,
  getTrainerMembers,
  getTrainerSalary,
};
