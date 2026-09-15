const MemberRepository = require("../repositories/MemberRepository");
const ApiError = require("../utils/ApiError");

class MemberService {
  getAllMembers() {
    return MemberRepository.findAll();
  }

  async getActiveMembers() {
    const members = await MemberRepository.findActive();
    if (members.length === 0) {
      throw new ApiError(404, "لا يوجد أعضاء مشتركين حاليًا");
    }
    return members;
  }

  async getMemberById(id) {
    const member = await MemberRepository.findById(id);
    if (!member) throw new ApiError(404, "Member not found");
    return member;
  }

  createMember(data) {
    return MemberRepository.create(data);
  }

  async updateMember(id, data) {
    const member = await MemberRepository.findById(id);
    if (!member) throw new ApiError(404, "Member not found");
    await MemberRepository.update(member, data);
    return member;
  }

  async deleteMember(id) {
    const deleted = await MemberRepository.delete(id);
    if (!deleted) throw new ApiError(404, "Member not found");
  }
}

module.exports = new MemberService();
