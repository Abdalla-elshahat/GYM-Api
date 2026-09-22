const MembershipPlanRepository = require("../repositories/MembershipPlanRepository");
const ApiError = require("../utils/ApiError");

class MembershipPlanService {
  getAllPlans() {
    return MembershipPlanRepository.findAll();
  }

  getPlanById(id) {
    return MembershipPlanRepository.findById(id);
  }

  createPlan(data) {
    return MembershipPlanRepository.create(data);
  }

  async updatePlan(id, data) {
    const plan = await MembershipPlanRepository.findByPk(id);
    if (!plan) throw new ApiError(400, "membershipPlan is not found");
    await MembershipPlanRepository.update(id, data);
  }

  async deletePlan(id) {
    const plan = await MembershipPlanRepository.findByPk(id);
    if (!plan) throw new ApiError(400, "membershipPlan is not found");
    await MembershipPlanRepository.delete(id);
  }

  async renewMembership(memberId, data) {
    const { MembershipPlanID } = data;
    const plan = await MembershipPlanRepository.findOneByPlanId(MembershipPlanID);
    if (!plan) throw new ApiError(400, "الاشتراك مش موجود");

    const [affected] = await MembershipPlanRepository.renewMember(memberId, {
      ...data,
      lesson: plan.lesson,
      status: "Active",
    });

    if (affected === 1) return "الاشتراك تم بالفعل";
    return null;
  }
}

module.exports = new MembershipPlanService();
