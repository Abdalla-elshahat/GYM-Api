const Feedback = require("../models/Feedback");
const Member = require("../models/member");

class FeedbackRepository {
  findAll() {
    return Feedback.findAll({ include: Member });
  }

  findById(id) {
    return Feedback.findByPk(id, { include: Member });
  }

  findByTrainerId(trainerId) {
    return Feedback.findAll({ where: { TrainerID: trainerId } });
  }

  findByMemberId(memberId) {
    return Feedback.findAll({ where: { MemberID: memberId } });
  }

  create(data) {
    return Feedback.create(data);
  }

  update(feedback, data) {
    return feedback.update(data);
  }

  delete(id) {
    return Feedback.destroy({ where: { FeedbackID: id } });
  }
}

module.exports = new FeedbackRepository();
