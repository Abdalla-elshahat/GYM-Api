const MemberClassService = require("../services/MemberClassService");

const getMembersInClass = async (req, res, next) => {
  try {
    const members = await MemberClassService.getMembersInClass(req.params.class_id);
    res.status(200).json({ members });
  } catch (err) {
    next(err);
  }
};

const getClassesForMember = async (req, res, next) => {
  try {
    const classes = await MemberClassService.getClassesForMember(req.params.member_id);
    res.status(200).json({ classes });
  } catch (err) {
    next(err);
  }
};

const addMemberToClass = async (req, res, next) => {
  try {
    await MemberClassService.addMemberToClass(req.params.member_id, req.body.class_id);
    res.status(201).json({ message: "تمت إضافة العضو إلى الفصل بنجاح" });
  } catch (err) {
    next(err);
  }
};

const removeMemberFromClass = async (req, res, next) => {
  try {
    await MemberClassService.removeMemberFromClass(req.params.member_id, req.body.class_id);
    res.status(200).json({ message: "تمت إزالة العضو من الفصل بنجاح" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMembersInClass,
  getClassesForMember,
  addMemberToClass,
  removeMemberFromClass,
};
