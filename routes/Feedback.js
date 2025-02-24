const express = require("express");
const Feedback = require("../models/Feedback");
const Member = require("../models/member");
const router = express.Router();
// ✅ جلب جميع الأراء
router.get("/", async (req, res) => {
  try {
    const Feedbacks = await Feedback.findAll({
      include:Member
    });
    res.status(200).json(Feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب راي معين ID
router.get("/:FeedbackID", async (req, res) => {
  try {
    const Feedbacks = await Feedback.findByPk(req.params.FeedbackID,{
      include:Member
    });
    if (!Feedbacks) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(Feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب كل الاراء عن المدرب ده ID
router.get("/Trainer/:TrainerID", async (req, res) => {
  try {
    const Feedbacks = await Feedback.findAll({
      where:{TrainerID:req.params.TrainerID}
    });
    if (!Feedbacks) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(Feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب كل الاراء الي العضو ده ضفها ده ID
router.get("/Member/:MemberID", async (req, res) => {
  try {
    const Feedbacks = await Feedback.findAll({
      where:{MemberID:req.params.MemberID}
    });
    if (!Feedbacks) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(Feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ إضافة Feedback جديد
router.post("/:MemberID", async (req, res) => {
  try {
    const Feedbacks = await Feedback.create({
      MemberID: req.params.MemberID,
      Date: new Date(),
      ...req.body
    });

    res.status(201).json({ Feedback: Feedbacks, message: "Feedback added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ تحديث بيانات عضو
router.patch("/:FeedbackID", async (req, res) => {
  try {
    const Feedbacks= await Feedback.findByPk(req.params.FeedbackID);
    if (!Feedbacks) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    await Feedbacks.update(req.body);
    res.json({ message: "Feedback updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ حذف Feedback
router.delete("/:FeedbackID", async (req, res) => {
  try {
    const deleted = await Feedback.destroy({ where: { FeedbackID: req.params.FeedbackID }});
    if (!deleted) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;