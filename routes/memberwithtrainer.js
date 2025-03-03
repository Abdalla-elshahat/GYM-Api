const express = require("express");
const Member = require("../models/member");
const Trainer = require("../models/Trainer");
const MemberWithTrainer = require("../models/MemberWithTrainer");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Member-Trainer
 *   description: API for managing relationships between members and trainers
 */

/**
 * @swagger
 * /api/trainer/{trainer_id}/members:
 *   get:
 *     summary: Get all members assigned to a specific trainer
 *     tags: [Member-Trainer]
 *     parameters:
 *       - in: path
 *         name: trainer_id
 *         required: true
 *         description: ID of the trainer
 *     responses:
 *       200:
 *         description: List of members assigned to the trainer.
 *       404:
 *         description: Trainer not found.
 *       500:
 *         description: Server error.
 */
// ✅جلب جميع الأعضاء الذين لديهم مدرب معين
router.get("/trainer/:trainer_id/members", async (req, res) => {
  try {
    const { trainer_id } = req.params;

    const trainer = await Trainer.findByPk(trainer_id, {
      include: [
        {
          model: Member,
          through: MemberWithTrainer,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    if (!trainer) {
      return res.status(404).json({ message: "المدرب غير موجود" });
    }

    res.status(200).json({ members: trainer.Members });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/member/{member_id}/trainers:
 *   get:
 *     summary: Get all trainers for a specific member
 *     tags: [Member-Trainer]
 *     parameters:
 *       - in: path
 *         name: member_id
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: List of trainers assigned to the member.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Server error.
 */
// ✅ جلب جميع المدربين الذين يتدرب عندهم عضو معين
router.get("/member/:member_id/trainers", async (req, res) => {
  try {
    const { member_id } = req.params;

    const member = await Member.findByPk(member_id, {
      include: [{ model: Trainer, through: MemberWithTrainer }],
    });

    if (!member) {
      return res.status(404).json({ message: "العضو غير موجود" });
    }

    res.status(200).json({ trainers: member.Trainers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/{member_id}:
 *   post:
 *     summary: Assign a member to a trainer
 *     tags: [Member-Trainer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainer_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Member assigned to trainer successfully.
 *       404:
 *         description: Member or trainer not found.
 *       500:
 *         description: Server error.
 */
// ✅ إضافة عضو إلى مدرب معين
router.post("/:member_id", async (req, res) => {
  const { member_id } = req.params;
  const { trainer_id } = req.body;
  try {
    const member = await Member.findByPk(member_id);
    const trainer = await Trainer.findByPk(trainer_id);

    if (!member || !trainer) {
      return res.status(404).json({ message: "العضو أو المدرب غير موجود" });
    }

    await MemberWithTrainer.create({ member_id, trainer_id });

    res.status(201).json({ message: "تمت إضافة العضو إلى المدرب بنجاح" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/{member_id}:
 *   delete:
 *     summary: Remove a member from a trainer
 *     tags: [Member-Trainer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainer_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Member removed from trainer successfully.
 *       404:
 *         description: Relationship not found.
 *       500:
 *         description: Server error.
 */
// ✅إزالة عضو من مدرب معين
router.delete("/:member_id", async (req, res) => {
  const { member_id } = req.params;
  const { trainer_id } = req.body;
  try {
    // التحقق من وجود العلاقة
    const record = await MemberWithTrainer.findOne({
      where: { member_id, trainer_id },
    });

    if (!record) {
      return res.status(404).json({ message: "العلاقة غير موجودة" });
    }

    await record.destroy();

    res.status(200).json({ message: "تمت إزالة العضو من المدرب بنجاح" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
