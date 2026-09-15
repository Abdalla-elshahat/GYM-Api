const MaintenanceService = require("../services/MaintenanceService");

const getAllMaintenance = async (req, res, next) => {
  try {
    const records = await MaintenanceService.getAllMaintenance();
    res.status(200).json(records);
  } catch (err) {
    next(err);
  }
};

const getMaintenanceById = async (req, res, next) => {
  try {
    const records = await MaintenanceService.getMaintenanceById(req.params.ID);
    res.json(records);
  } catch (err) {
    next(err);
  }
};

const createMaintenance = async (req, res, next) => {
  try {
    const record = await MaintenanceService.createMaintenance(req.params.EqID, req.body);
    res.status(201).json({ message: "maintance is  successfully", data: record });
  } catch (err) {
    next(err);
  }
};

const updateMaintenance = async (req, res, next) => {
  try {
    const record = await MaintenanceService.updateMaintenance(req.params.EqID, req.body);
    res.json({ message: "Maintenance out successfully", data: record });
  } catch (err) {
    next(err);
  }
};

const deleteMaintenance = async (req, res, next) => {
  try {
    await MaintenanceService.deleteMaintenance(req.params.EqID);
    res.json({ message: "maintains deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMaintenance,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
