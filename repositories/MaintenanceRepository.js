const Maintenance = require("../models/Maintenance");
const Equipment = require("../models/Equipment");

class MaintenanceRepository {
  findAll() {
    return Maintenance.findAll({});
  }

  findById(id) {
    return Maintenance.findAll({ where: { MaintenanceID: id }, include: Equipment });
  }

  findOneByEquipmentId(equipmentId) {
    return Maintenance.findOne({ where: { EquipmentID: equipmentId } });
  }

  create(data) {
    return Maintenance.create(data);
  }

  update(equipmentId, data) {
    return Maintenance.update(data, { where: { EquipmentID: equipmentId } });
  }

  delete(equipmentId) {
    return Maintenance.destroy({ where: { EquipmentID: equipmentId } });
  }
}

module.exports = new MaintenanceRepository();
