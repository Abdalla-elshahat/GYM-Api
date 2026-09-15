const MemberTrainerRepository = require("../repositories/MemberTrainerRepository");
const ApiError = require("../utils/ApiError");

class MemberTrainerService {
  async getMembersForTrainer(trainerId) {
    const trainer = await MemberTrainerRepository.findTrainerWithMembers(trainerId);
    if (!trainer) throw new ApiError(404, "المدرب غير موجود");
    return trainer.Members;
  }

  async getTrainersForMember(memberId) {
    const member = await MemberTrainerRepository.findMemberWithTrainers(memberId);
    if (!member) throw new ApiError(404, "العضو غير موجود");
    return member.Trainers;
  }

  async assignMemberToTrainer(memberId, trainerId) {
    const member = await MemberTrainerRepository.findMemberById(memberId);
    const trainer = await MemberTrainerRepository.findTrainerById(trainerId);

    if (!member || !trainer) throw new ApiError(404, "العضو أو المدرب غير موجود");

    await MemberTrainerRepository.assignMemberToTrainer(memberId, trainerId);
  }

  async removeMemberFromTrainer(memberId, trainerId) {
    const record = await MemberTrainerRepository.findAssignment(memberId, trainerId);
    if (!record) throw new ApiError(404, "العلاقة غير موجودة");
    await MemberTrainerRepository.removeAssignment(record);
  }
}

module.exports = new MemberTrainerService();
