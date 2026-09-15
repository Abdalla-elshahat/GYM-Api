const MembershipPlanService = require("../services/MembershipPlanService");

const getAllPlans = async (req, res, next) => {
  try {
    const plans = await MembershipPlanService.getAllPlans();
    res.status(200).json(plans);
  } catch (err) {
    next(err);
  }
};

const getPlanById = async (req, res, next) => {
  try {
    const plans = await MembershipPlanService.getPlanById(req.params.planID);
    res.json(plans);
  } catch (err) {
    next(err);
  }
};

const createPlan = async (req, res, next) => {
  try {
    const plan = await MembershipPlanService.createPlan(req.body);
    res.json(plan);
  } catch (err) {
    next(err);
  }
};

const updatePlan = async (req, res, next) => {
  try {
    await MembershipPlanService.updatePlan(req.params.MembershipPlanID, req.body);
    res.status(200).json({ message: "membershipPlan is UPdated successfully" });
  } catch (err) {
    next(err);
  }
};

const deletePlan = async (req, res, next) => {
  try {
    await MembershipPlanService.deletePlan(req.params.MembershipPlanID);
    res.status(200).json({ message: "membershipPlan is deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const renewMembership = async (req, res, next) => {
  try {
    const message = await MembershipPlanService.renewMembership(req.params.MemberID, req.body);
    res.json({ message: message || "تم تحديث بيانات العضو" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  renewMembership,
};
