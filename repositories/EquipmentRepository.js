const { Op } = require("sequelize");
const Equipment = require("../models/Equipment");
const Maintenance = require("../models/Maintenance");

class EquipmentRepository {
  findAll(q) {
    if (!q) return Equipment.findAll({ include: Maintenance });

    const like = { [Op.like]: `%${q}%` };
    return Equipment.findAll({
      where: {
        [Op.or]: [
          { EquipmentName: like },
          { EquipmentType: like },
          { Status: like },
        ],
      },
      include: Maintenance,
    });
  }

  findById(id) {
    return Equipment.findAll({ where: { EquipmentID: id }, include: Maintenance });
  }

  findOneById(id) {
    return Equipment.findOne({ where: { EquipmentID: id } });
  }

  create(data) {
    return Equipment.create(data);
  }

  update(id, data) {
    return Equipment.update(data, { where: { EquipmentID: id } });
  }

  deleteMaintenanceByEquipmentId(id) {
    return Maintenance.destroy({ where: { EquipmentID: Number(id) } });
  }

  delete(id) {
    return Equipment.destroy({ where: { EquipmentID: Number(id) } });
  }
}

module.exports = new EquipmentRepository();
