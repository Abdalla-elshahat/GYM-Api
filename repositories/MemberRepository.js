const { Op } = require("sequelize");
const Member = require("../models/member");
const MembershipPlan = require("../models/MembershipPlan");

class MemberRepository {
  findAll(q) {
    if (!q) return Member.findAll({ include: MembershipPlan, attributes: { exclude: ["password"] } });

    const like = { [Op.like]: `%${q}%` };
    return Member.findAll({
      where: {
        [Op.or]: [
          { FirstName: like },
          { LastName: like },
          { Email: like },
          { PhoneNumber: like },
        ],
      },
      include: MembershipPlan,
      attributes: { exclude: ["password"] },
    });
  }

  findActive() {
    return Member.findAll({
      where: { status: "Active" },
      include: [{ model: MembershipPlan }],
      attributes: { exclude: ["password"] },
    });
  }

  findById(id) {
    return Member.findByPk(id, { include: MembershipPlan, attributes: { exclude: ["password"] } });
  }

  create(data) {
    return Member.create(data);
  }

  update(member, data) {
    return member.update(data);
  }

  delete(id) {
    return Member.destroy({ where: { MemberID: id } });
  }
}

module.exports = new MemberRepository();
