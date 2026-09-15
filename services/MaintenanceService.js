const MaintenanceRepository = require("../repositories/MaintenanceRepository");
const ApiError = require("../utils/ApiError");

class MaintenanceService {
  getAllMaintenance() {
    return MaintenanceRepository.findAll();
  }

  getMaintenanceById(id) {
    return MaintenanceRepository.findById(id);
  }

  createMaintenance(equipmentId, data) {
    return MaintenanceRepository.create({
      EquipmentID: equipmentId,
      MaintenanceDate: Date.now(),
      ...data,
    });
  }

  async updateMaintenance(equipmentId, data) {
    const record = await MaintenanceRepository.findOneByEquipmentId(equipmentId);
    if (!record) throw new ApiError(404, "No Maintenance found");

    await MaintenanceRepository.update(equipmentId, { MaintenanceDate: Date.now(), ...data });
    return MaintenanceRepository.findOneByEquipmentId(equipmentId);
  }

  async deleteMaintenance(equipmentId) {
    const record = await MaintenanceRepository.findOneByEquipmentId(equipmentId);
    if (!record) throw new ApiError(404, "No Equipment found");
    await MaintenanceRepository.delete(equipmentId);
  }
}

module.exports = new MaintenanceService();
