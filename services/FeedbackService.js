const FeedbackRepository = require("../repositories/FeedbackRepository");
const ApiError = require("../utils/ApiError");

class FeedbackService {
  getAllFeedback() {
    return FeedbackRepository.findAll();
  }

  async getFeedbackById(id) {
    const feedback = await FeedbackRepository.findById(id);
    if (!feedback) throw new ApiError(404, "Feedback not found");
    return feedback;
  }

  getFeedbackByTrainer(trainerId) {
    return FeedbackRepository.findByTrainerId(trainerId);
  }

  getFeedbackByMember(memberId) {
    return FeedbackRepository.findByMemberId(memberId);
  }

  createFeedback(memberId, data) {
    return FeedbackRepository.create({
      MemberID: memberId,
      Date: new Date(),
      ...data,
    });
  }

  async updateFeedback(id, data) {
    const feedback = await FeedbackRepository.findById(id);
    if (!feedback) throw new ApiError(404, "Feedback not found");
    await FeedbackRepository.update(feedback, data);
    return feedback;
  }

  async deleteFeedback(id) {
    const deleted = await FeedbackRepository.delete(id);
    if (!deleted) throw new ApiError(404, "Feedback not found");
  }
}

module.exports = new FeedbackService();
