const ClassService = require("../services/ClassService");

const getAllClasses = async (req, res, next) => {
  try {
    const classes = await ClassService.getAllClasses();
    res.status(200).json(classes);
  } catch (err) {
    next(err);
  }
};

const getClassById = async (req, res, next) => {
  try {
    const classData = await ClassService.getClassById(req.params.ClassID);
    res.json(classData);
  } catch (err) {
    next(err);
  }
};

const createClass = async (req, res, next) => {
  try {
    const newClass = await ClassService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    next(err);
  }
};

const updateClass = async (req, res, next) => {
  try {
    const updatedClass = await ClassService.updateClass(req.params.classId, req.body);
    res.json(updatedClass);
  } catch (err) {
    next(err);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    await ClassService.deleteClass(req.params.classId);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
