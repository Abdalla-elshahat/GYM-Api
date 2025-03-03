const express = require("express");
const Feedback = require("../models/Feedback");
const Member = require("../models/member");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: API for managing feedback
 */

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedbacks]
 *     description: Retrieve a list of all feedbacks.
 *     responses:
 *       200:
 *         description: A list of feedbacks.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /api/feedbacks/{FeedbackID}:
 *   get:
 *     summary: Get a feedback by ID
 *     tags: [Feedbacks]
 *     description: Retrieve details of a specific feedback by its ID.
 *     parameters:
 *       - in: path
 *         name: FeedbackID
 *         required: true
 *         description: ID of the feedback to retrieve
 *     responses:
 *       200:
 *         description: Feedback details.
 *       404:
 *         description: Feedback not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /api/feedbacks/trainer/{TrainerID}:
 *   get:
 *     summary: Get all feedbacks for a specific trainer
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         description: ID of the trainer
 *     responses:
 *       200:
 *         description: List of feedbacks for the trainer.
 *       404:
 *         description: Feedback not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /api/feedbacks/member/{MemberID}:
 *   get:
 *     summary: Get all feedbacks added by a specific member
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: MemberID
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: List of feedbacks by the member.
 *       404:
 *         description: Feedback not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /api/feedbacks/{MemberID}:
 *   post:
 *     summary: Add a new feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TrainerID:
 *                 type: integer
 *               Comment:
 *                 type: string
 *               Rating:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Feedback added successfully.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /api/feedbacks/{FeedbackID}:
 *   patch:
 *     summary: Update a feedback
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: Feedback updated successfully.
 *       404:
 *         description: Feedback not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /api/feedbacks/{FeedbackID}:
 *   delete:
 *     summary: Delete a feedback
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: Feedback deleted successfully.
 *       404:
 *         description: Feedback not found.
 *       500:
 *         description: Server error.
 */
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