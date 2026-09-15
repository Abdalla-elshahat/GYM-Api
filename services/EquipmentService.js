const EquipmentRepository = require("../repositories/EquipmentRepository");
const ApiError = require("../utils/ApiError");

class EquipmentService {
  getAllEquipment() {
    return EquipmentRepository.findAll();
  }

  getEquipmentById(id) {
    return EquipmentRepository.findById(id);
  }

  createEquipment(data) {
    return EquipmentRepository.create(data);
  }

  async updateEquipment(id, data) {
    const record = await EquipmentRepository.findOneById(id);
    if (!record) throw new ApiError(404, "No equipment record found");

    const [affected] = await EquipmentRepository.update(id, data);
    if (affected === 0) throw new ApiError(400, "Failed to update equipment data");

    return EquipmentRepository.findOneById(id);
  }

  async deleteEquipment(id) {
    await EquipmentRepository.deleteMaintenanceByEquipmentId(id);
    const deleted = await EquipmentRepository.delete(id);
    if (!deleted) throw new ApiError(404, "Equipment not found");
  }
}

module.exports = new EquipmentService();
