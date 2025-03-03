const express = require("express");
const router = express.Router();
const Member = require("../models/member");
const MembershipPlan = require("../models/MembershipPlan");

/**
 * @swagger
 * tags:
 *   name: MembershipPlans
 *   description: API for managing membership plans
 */

/**
 * @swagger
 * /api/membership-plans:
 *   get:
 *     summary: Get all membership plans
 *     tags: [MembershipPlans]
 *     responses:
 *       200:
 *         description: A list of all membership plans.
 *       500:
 *         description: Server error.
 */
// ✅ جلب جميع الاشتركات
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await MembershipPlan.findAll();
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/membership-plans/{planID}:
 *   get:
 *     summary: Get a membership plan by ID
 *     tags: [MembershipPlans]
 *     parameters:
 *       - in: path
 *         name: planID
 *         required: true
 *         description: ID of the membership plan to retrieve
 *     responses:
 *       200:
 *         description: Membership plan details.
 *       404:
 *         description: Membership plan not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /api/membership-plans:
 *   post:
 *     summary: Create a new membership plan
 *     tags: [MembershipPlans]
 *     responses:
 *       201:
 *         description: Membership plan created successfully.
 *       500:
 *         description: Server error.
 */
// ✅ اضافه plan جديده
router.post("/", async (req, res) => {
  try {
    const records = await MembershipPlan.create(req.body);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/membership-plans/{MembershipPlanID}:
 *   put:
 *     summary: Update a membership plan
 *     tags: [MembershipPlans]
 *     responses:
 *       200:
 *         description: Membership plan updated successfully.
 *       404:
 *         description: Membership plan not found.
 *       500:
 *         description: Server error.
 */
// ✅ تعديل membershipPlan
router.put("/:MembershipPlanID", async (req, res) => {
  const {MembershipPlanID}=req.params;
  try {
    const Membership=await MembershipPlan.findByPk(MembershipPlanID);
    if(Membership){
      await MembershipPlan.update(req.body,{where:{MembershipPlanID}})
      res.status(200).json({
        message:"membershipPlan is UPdated successfully"
      });
    }
    else{
      res.status(400).json({
        message:"membershipPlan is not found"
      });
    }
 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/membership-plans/{MembershipPlanID}:
 *   delete:
 *     summary: Delete a membership plan
 *     tags: [MembershipPlans]
 *     responses:
 *       200:
 *         description: Membership plan deleted successfully.
 *       404:
 *         description: Membership plan not found.
 *       500:
 *         description: Server error.
 */
// ✅ حذف PLAN
router.delete("/:MembershipPlanID", async (req, res) => {
  try {
    const Membership=await MembershipPlan.findByPk(req.params.MembershipPlanID);
    if(Membership){
      await MembershipPlan.destroy({where:{MembershipPlanID:req.params.MembershipPlanID}})
      res.status(200).json({
        message:"membershipPlan is deleted successfully"
      });
    }
    else{
      res.status(400).json({
        message:"membershipPlan is not found"
      });
    }
 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/membership-plans/renew/{MemberID}:
 *   put:
 *     summary: Renew a membership
 *     tags: [MembershipPlans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MembershipPlanID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Membership renewed successfully.
 *       400:
 *         description: Membership not found.
 *       500:
 *         description: Server error.
 */
// ✅ تجديد اشتراك
router.put("/:MemberID", async (req, res) => {
  const {MemberID}=req.params 
  const {MembershipPlanID}=req.body
  try {
    const Membership=await MembershipPlan.findOne({where:{ MembershipPlanID}})
    if(!Membership){
      res.status(400).json({
        message:"الاشتراك مش موجود"
      });
    }
    const records = await Member.update({
      lesson:Membership.lesson,
      status:"Active",
      ...req.body},
      { 
      where: { MemberID },
    });
    if(records==1){
      res.json({message:"الاشتراك تم بالفعل"});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
