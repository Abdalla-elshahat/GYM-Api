const Class = require("../models/Class");
const Trainer = require("../models/Trainer");

class ClassRepository {
  findAll() {
    return Class.findAll();
  }

  findById(id) {
    return Class.findByPk(id, { include: Trainer });
  }

  create(data) {
    return Class.create(data);
  }

  update(id, data) {
    return Class.update(data, { where: { ClassID: id } });
  }

  delete(id) {
    return Class.destroy({ where: { ClassID: id } });
  }
}

module.exports = new ClassRepository();
