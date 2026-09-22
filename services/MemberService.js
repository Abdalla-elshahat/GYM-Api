const bcrypt = require("bcrypt");
const MemberRepository = require("../repositories/MemberRepository");
const ApiError = require("../utils/ApiError");

const SALT_ROUNDS = 10;

async function hashPasswordIfPresent(data) {
  if (!data.password) return data;
  return { ...data, password: await bcrypt.hash(data.password, SALT_ROUNDS) };
}

class MemberService {
  getAllMembers(q) {
    return MemberRepository.findAll(q);
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

  async createMember(data) {
    return MemberRepository.create(await hashPasswordIfPresent(data));
  }

  async updateMember(id, data) {
    const member = await MemberRepository.findById(id);
    if (!member) throw new ApiError(404, "Member not found");
    await MemberRepository.update(member, await hashPasswordIfPresent(data));
    return member;
  }

  async deleteMember(id) {
    const deleted = await MemberRepository.delete(id);
    if (!deleted) throw new ApiError(404, "Member not found");
  }
}

module.exports = new MemberService();
