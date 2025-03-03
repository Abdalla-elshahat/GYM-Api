
const express = require("express");
const Trainer = require("../models/Trainer");
const Class = require("../models/Class");
const Member = require("../models/member");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Trainers
 *   description: API for managing trainers
 */

/**
 * @swagger
 * /api/trainers:
 *   get:
 *     summary: Get all trainers
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: A list of trainers.
 *       500:
 *         description: Server error.
 */
// ✅ جلب جميع الكباتن
router.get("/", async (req, res) => {
  try {
    const Trainers = await Trainer.findAll({},{password: false});
    res.status(200).json(Trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/trainers/{TrainerID}:
 *   get:
 *     summary: Get a trainer by ID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         description: ID of the trainer to retrieve
 *     responses:
 *       200:
 *         description: Trainer details.
 *       404:
 *         description: Trainer not found.
 *       500:
 *         description: Server error.
 */
// ✅ جلب مدرب  معين عبر ID
router.get("/:TrainerID", async (req, res) => {
  try {
    const Trainers = await Trainer.findByPk(req.params.TrainerID);
    if (!Trainers) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.json(Trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/trainers:
 *   post:
 *     summary: Add a new trainer
 *     tags: [Trainers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trainer added successfully.
 *       500:
 *         description: Server error.
 */
// ✅ إضافة مدرب جديد
router.post("/", async (req, res) => {
  try {
    const Trainers = await Trainer.create({HireDate:new Date(),...req.body});
    res.status(201).json({ Trainer: Trainers, message: "Trainer added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/trainers/{TrainerID}:
 *   patch:
 *     summary: Update a trainer
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: Trainer updated successfully.
 *       404:
 *         description: Trainer not found.
 *       500:
 *         description: Server error.
 */
// ✅ تحديث بيانات مدرب
router.patch("/:TrainerID", async (req, res) => {
  try {
    const Trainers = await Trainer.findByPk(req.params.TrainerID);
    if (!Trainers) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    await Trainers.update(req.body);
    res.json({ message: "Trainer updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/trainers/{TrainerID}:
 *   delete:
 *     summary: Delete a trainer
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: Trainer deleted successfully.
 *       404:
 *         description: Trainer not found.
 *       500:
 *         description: Server error.
 */
// ✅ حذف مدرب
router.delete("/:TrainerID", async (req, res) => {
  try {
    const deleted = await Trainer.destroy({ where: { TrainerID: req.params.TrainerID }});
    if (!deleted) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.json({ message: "Trainer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/trainers/{TrainerID}/classes:
 *   get:
 *     summary: Get all classes trained by a specific trainer
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         description: ID of the trainer
 *     responses:
 *       200:
 *         description: List of classes trained by the trainer.
 *       404:
 *         description: No classes found.
 *       500:
 *         description: Server error.
 */
// ✅  جلب جميع الكلاسات التي يدربها مدرب معين
router.get("/:TrainerID/classes", async (req, res) => {
  try {
    const trainerClasses = await Class.findAll({
      where: { TrainerID: req.params.TrainerID }
    });

    if (!trainerClasses.length) {
      return res.status(404).json({ message: "No classes found for this trainer" });
    }

    res.json(trainerClasses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/trainers/{TrainerID}/members:
 *   get:
 *     summary: Get all members training with a specific trainer
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         description: ID of the trainer
 *     responses:
 *       200:
 *         description: List of members training with the trainer.
 *       404:
 *         description: Trainer not found.
 *       500:
 *         description: Server error.
 */
// ✅  جلب جميع الأعضاء الذين يتدربون مع مدرب معين
router.get("/:TrainerID/members", async (req, res) => {
  try {
    const trainerMembers = await Trainer.findByPk(req.params.TrainerID, {
      include: {
        model: Member,
        through: { attributes: [] }, // لمنع عرض بيانات الجدول الوسيط
      }
    });

    if (!trainerMembers) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.json(trainerMembers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/trainers/salary/{TrainerID}:
 *   get:
 *     summary: Get the salary of a trainer
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         description: ID of the trainer
 *     responses:
 *       200:
 *         description: Trainer salary details.
 *       404:
 *         description: Trainer not found.
 *       500:
 *         description: Server error.
 */
// ✅ جلب راتب المدرب
router.get("/salary/:TrainerID", async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.TrainerID);

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    const salary = await trainer.getSalary(); // ✅ جلب الراتب بشكل صحيح

    res.json({
       "salaryofclasses":salary,
       "fixedsalary":trainer.fixedsalary*trainer.lesson,
       "totalSalary":salary+(trainer.fixedsalary*trainer.lesson)
     });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;