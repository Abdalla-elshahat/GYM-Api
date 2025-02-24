
const express = require("express");
const Trainer = require("../models/Trainer");
const Class = require("../models/Class");
const Member = require("../models/Member");
const MemberWithTrainer = require("../models/MemberWithTrainer");
const router = express.Router();
// ✅ جلب جميع الكباتن
router.get("/", async (req, res) => {
  try {
    const Trainers = await Trainer.findAll({},{password: false});
    res.status(200).json(Trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
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
// ✅ إضافة مدرب جديد
router.post("/", async (req, res) => {
  try {
    const Trainers = await Trainer.create({HireDate:new Date(),...req.body});
    res.status(201).json({ Trainer: Trainers, message: "Trainer added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
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


module.exports = router;