const Member = require("../models/member");
const MembershipPlan = require("../models/MembershipPlan");

class MembershipPlanRepository {
  findAll() {
    return MembershipPlan.findAll();
  }

  findById(id) {
    return MembershipPlan.findAll({ where: { MembershipPlanID: id }, include: Member });
  }

  findByPk(id) {
    return MembershipPlan.findByPk(id);
  }

  findOneByPlanId(id) {
    return MembershipPlan.findOne({ where: { MembershipPlanID: id } });
  }

  create(data) {
    return MembershipPlan.create(data);
  }

  update(id, data) {
    return MembershipPlan.update(data, { where: { MembershipPlanID: id } });
  }

  delete(id) {
    return MembershipPlan.destroy({ where: { MembershipPlanID: id } });
  }

  renewMember(memberId, data) {
    return Member.update(data, { where: { MemberID: memberId } });
  }
}

module.exports = new MembershipPlanRepository();
