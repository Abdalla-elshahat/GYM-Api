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
    // MaintenanceDate is a real user-editable field (defaults to now, but the
    // caller may supply a specific date) — only EquipmentID must stay pinned
    // to the URL param so a record can't be silently reassigned.
    return MaintenanceRepository.create({
      MaintenanceDate: Date.now(),
      ...data,
      EquipmentID: equipmentId,
    });
  }

  async updateMaintenance(equipmentId, data) {
    const record = await MaintenanceRepository.findOneByEquipmentId(equipmentId);
    if (!record) throw new ApiError(404, "No Maintenance found");

    await MaintenanceRepository.update(equipmentId, {
      MaintenanceDate: Date.now(),
      ...data,
      EquipmentID: equipmentId,
    });
    return MaintenanceRepository.findOneByEquipmentId(equipmentId);
  }

  async deleteMaintenance(equipmentId) {
    const record = await MaintenanceRepository.findOneByEquipmentId(equipmentId);
    if (!record) throw new ApiError(404, "No Equipment found");
    await MaintenanceRepository.delete(equipmentId);
  }
}

module.exports = new MaintenanceService();
