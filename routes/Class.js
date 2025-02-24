const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const Trainer = require("../models/Trainer");

// ✅ جلب جميع Classs
router.get("/", async (req, res) => {
  try {
    const Classs = await Class.findAll();
    res.status(200).json(Classs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب اشتراك معين عبر ClassID
router.get("/:ClassID", async (req, res) => {
  try {
    const Classs = await Class.findByPk(req.params.ClassID,{
      include:Trainer
        });
    res.json(Classs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ اضافه class جديد
router.post("/", async (req, res) => {
  try {
    const { TrainerID, ClassName, ClassDescription, ClassDate, Duration, MaxParticipants } = req.body;

    if (!TrainerID || !ClassName || !ClassDate || !Duration || !MaxParticipants) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ class تعديل
router.put("/:classId", async (req, res) => {
  try {
    const classData = await Class.findByPk(req.params.classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    await Class.update(req.body, { where: { ClassID: req.params.classId } });

    const updatedClass = await Class.findByPk(req.params.classId);
    res.json(updatedClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ class حذف
router.delete("/:classId", async (req, res) => {
  try {
    const classData = await Class.findByPk(req.params.classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    await Class.destroy({ where: { ClassID: req.params.classId } });

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
