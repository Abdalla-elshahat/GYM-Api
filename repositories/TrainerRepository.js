const { Op } = require("sequelize");
const Trainer = require("../models/Trainer");
const Class = require("../models/Class");
const Member = require("../models/member");

class TrainerRepository {
  findAll(q) {
    if (!q) return Trainer.findAll();

    const like = { [Op.like]: `%${q}%` };
    return Trainer.findAll({
      where: {
        [Op.or]: [
          { FirstName: like },
          { LastName: like },
          { Email: like },
          { PhoneNumber: like },
        ],
      },
    });
  }

  findById(id) {
    return Trainer.findByPk(id);
  }

  create(data) {
    return Trainer.create(data);
  }

  update(trainer, data) {
    return trainer.update(data);
  }

  delete(id) {
    return Trainer.destroy({ where: { TrainerID: id } });
  }

  findClassesByTrainerId(id) {
    return Class.findAll({ where: { TrainerID: id } });
  }

  findWithMembers(id) {
    return Trainer.findByPk(id, {
      include: {
        model: Member,
        through: { attributes: [] },
      },
    });
  }
}

module.exports = new TrainerRepository();
