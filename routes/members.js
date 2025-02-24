require("dotenv").config();
const express = require("express");
const router = express.Router();
const Member = require("../models/member");
const cors = require("cors");
const app = express.Router();
app.use(cors());
app.use(express.json());
const { Op, QueryTypes } = require("sequelize");
const MembershipPlan = require("../models/MembershipPlan");
// ✅ جلب جميع الأعضاء
router.get("/", async (req, res) => {
  try {
    const members = await Member.findAll({
      include:MembershipPlan
    },{password: false});
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب عضو معين عبر ID
router.get("/:memberID", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.memberID,{
        include:MembershipPlan
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ إضافة عضو جديد
router.post("/", async (req, res) => {
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json({ member: newMember, message: "Member added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ تحديث بيانات عضو
router.patch("/:memberID", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.memberID);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    await member.update(req.body);
    res.json({ message: "Member updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ حذف عضو
router.delete("/:memberID", async (req, res) => {
  try {
    const deleted = await Member.destroy({ where: { MemberID: req.params.memberID }});
    if (!deleted) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;