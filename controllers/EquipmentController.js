const EquipmentService = require("../services/EquipmentService");

const getAllEquipment = async (req, res, next) => {
  try {
    const equipment = await EquipmentService.getAllEquipment();
    res.status(200).json(equipment);
  } catch (err) {
    next(err);
  }
};

const getEquipmentById = async (req, res, next) => {
  try {
    const records = await EquipmentService.getEquipmentById(req.params.eqID);
    res.json(records);
  } catch (err) {
    next(err);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const eq = await EquipmentService.createEquipment(req.body);
    res.status(201).json({ message: "Equipment added successfully", data: eq });
  } catch (err) {
    next(err);
  }
};

const updateEquipment = async (req, res, next) => {
  try {
    const record = await EquipmentService.updateEquipment(req.params.eqID, req.body);
    res.json({ message: "Equipment updated successfully", data: record });
  } catch (err) {
    next(err);
  }
};

const deleteEquipment = async (req, res, next) => {
  try {
    await EquipmentService.deleteEquipment(req.params.eqID);
    res.json({ message: "Equipment and related maintenance records deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
