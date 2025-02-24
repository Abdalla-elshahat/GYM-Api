const express = require("express");
const router = express.Router();
const Member = require("../models/member");
const MembershipPlan = require("../models/MembershipPlan");


// ✅ جلب جميع الاشتركات
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await MembershipPlan.findAll({ include: Member });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ جلب اشتراك معين عبر planID
router.get("/:planID", async (req, res) => {
  try {
    const records = await MembershipPlan.findAll({ 
      where: { MembershipPlanID: req.params.planID },
      include: Member 
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const records = await MembershipPlan.create(req.body);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ تجديد اشتراك
router.put("/:memberID", async (req, res) => {
  const {MembershipPlanID}=req.body
  try {
    const Membership=await MembershipPlan.findOne({
      where:{
        MembershipPlanID
      }
    })
    const records = await Member.update({lesson:Membership.lesson,...req.body},{ 
      where: { MemberID: req.params.memberID },
    });
    if(records==1){
      res.json("الاشتراك تم بالفعل");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
