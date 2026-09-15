const Member = require("../models/member");
const MembershipPlan = require("../models/MembershipPlan");

class MemberRepository {
  findAll() {
    return Member.findAll({ include: MembershipPlan });
  }

  findActive() {
    return Member.findAll({
      where: { status: "Active" },
      include: [{ model: MembershipPlan }],
      attributes: { exclude: ["password"] },
    });
  }

  findById(id) {
    return Member.findByPk(id, { include: MembershipPlan });
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
