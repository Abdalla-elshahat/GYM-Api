const MemberTrainerService = require("../services/MemberTrainerService");

const getMembersForTrainer = async (req, res, next) => {
  try {
    const members = await MemberTrainerService.getMembersForTrainer(req.params.trainer_id);
    res.status(200).json({ members });
  } catch (err) {
    next(err);
  }
};

const getTrainersForMember = async (req, res, next) => {
  try {
    const trainers = await MemberTrainerService.getTrainersForMember(req.params.member_id);
    res.status(200).json({ trainers });
  } catch (err) {
    next(err);
  }
};

const assignMemberToTrainer = async (req, res, next) => {
  try {
    await MemberTrainerService.assignMemberToTrainer(req.params.member_id, req.body.trainer_id);
    res.status(201).json({ message: "تمت إضافة العضو إلى المدرب بنجاح" });
  } catch (err) {
    next(err);
  }
};

const removeMemberFromTrainer = async (req, res, next) => {
  try {
    await MemberTrainerService.removeMemberFromTrainer(req.params.member_id, req.body.trainer_id);
    res.status(200).json({ message: "تمت إزالة العضو من المدرب بنجاح" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMembersForTrainer,
  getTrainersForMember,
  assignMemberToTrainer,
  removeMemberFromTrainer,
};
