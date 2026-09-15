const Member = require("../models/member");
const Trainer = require("../models/Trainer");
const MemberWithTrainer = require("../models/MemberWithTrainer");

class MemberTrainerRepository {
  findTrainerWithMembers(trainerId) {
    return Trainer.findByPk(trainerId, {
      include: [
        {
          model: Member,
          through: MemberWithTrainer,
          attributes: { exclude: ["password"] },
        },
      ],
    });
  }

  findMemberWithTrainers(memberId) {
    return Member.findByPk(memberId, {
      include: [{ model: Trainer, through: MemberWithTrainer }],
    });
  }

  findMemberById(memberId) {
    return Member.findByPk(memberId);
  }

  findTrainerById(trainerId) {
    return Trainer.findByPk(trainerId);
  }

  assignMemberToTrainer(memberId, trainerId) {
    return MemberWithTrainer.create({ member_id: memberId, trainer_id: trainerId });
  }

  findAssignment(memberId, trainerId) {
    return MemberWithTrainer.findOne({ where: { member_id: memberId, trainer_id: trainerId } });
  }

  removeAssignment(record) {
    return record.destroy();
  }
}

module.exports = new MemberTrainerRepository();
