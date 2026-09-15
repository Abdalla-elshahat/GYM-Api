const FeedbackService = require("../services/FeedbackService");

const getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await FeedbackService.getAllFeedback();
    res.status(200).json(feedback);
  } catch (err) {
    next(err);
  }
};

const getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await FeedbackService.getFeedbackById(req.params.FeedbackID);
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

const getFeedbackByTrainer = async (req, res, next) => {
  try {
    const feedback = await FeedbackService.getFeedbackByTrainer(req.params.TrainerID);
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

const getFeedbackByMember = async (req, res, next) => {
  try {
    const feedback = await FeedbackService.getFeedbackByMember(req.params.MemberID);
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

const createFeedback = async (req, res, next) => {
  try {
    const feedback = await FeedbackService.createFeedback(req.params.MemberID, req.body);
    res.status(201).json({ Feedback: feedback, message: "Feedback added successfully" });
  } catch (err) {
    next(err);
  }
};

const updateFeedback = async (req, res, next) => {
  try {
    await FeedbackService.updateFeedback(req.params.FeedbackID, req.body);
    res.json({ message: "Feedback updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    await FeedbackService.deleteFeedback(req.params.FeedbackID);
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFeedback,
  getFeedbackById,
  getFeedbackByTrainer,
  getFeedbackByMember,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
