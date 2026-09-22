const MemberService = require("../services/MemberService");

const getAllMembers = async (req, res, next) => {
  try {
    const members = await MemberService.getAllMembers(req.query.q);
    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
};

const getActiveMembers = async (req, res, next) => {
  try {
    const members = await MemberService.getActiveMembers();
    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
};

const getMemberById = async (req, res, next) => {
  try {
    const member = await MemberService.getMemberById(req.params.memberID);
    res.status(200).json(member);
  } catch (err) {
    next(err);
  }
};

const createMember = async (req, res, next) => {
  try {
    const member = await MemberService.createMember(req.body);
    res.status(201).json({ member, message: "Member added successfully" });
  } catch (err) {
    next(err);
  }
};

const updateMember = async (req, res, next) => {
  try {
    await MemberService.updateMember(req.params.memberID, req.body);
    res.status(200).json({ message: "Member updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    await MemberService.deleteMember(req.params.memberID);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMembers,
  getActiveMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
