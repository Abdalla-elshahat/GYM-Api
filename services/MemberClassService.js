const MemberClassRepository = require("../repositories/MemberClassRepository");
const ApiError = require("../utils/ApiError");

class MemberClassService {
  async getMembersInClass(classId) {
    const classItem = await MemberClassRepository.findClassWithMembers(classId);
    if (!classItem) throw new ApiError(404, "الفصل غير موجود");
    return classItem.Members;
  }

  async getClassesForMember(memberId) {
    const member = await MemberClassRepository.findMemberWithClasses(memberId);
    if (!member) throw new ApiError(404, "العضو غير موجود");
    return member.Classes;
  }

  async addMemberToClass(memberId, classId) {
    const member = await MemberClassRepository.findMemberById(memberId);
    const classItem = await MemberClassRepository.findClassById(classId);

    if (!member || !classItem) throw new ApiError(404, "العضو أو الفصل غير موجود");
    if (classItem.numofmember >= classItem.MaxParticipants) {
      throw new ApiError(400, "This class is full");
    }

    await MemberClassRepository.incrementClassMembers(classItem);
    await MemberClassRepository.addMemberToClass(memberId, classId);
  }

  async removeMemberFromClass(memberId, classId) {
    const classItem = await MemberClassRepository.findClassById(classId);
    const record = await MemberClassRepository.findMembership(memberId, classId);

    if (!record) throw new ApiError(404, "العلاقة غير موجودة");

    await MemberClassRepository.decrementClassMembers(classItem);
    await MemberClassRepository.removeMembership(record);
  }
}

module.exports = new MemberClassService();
