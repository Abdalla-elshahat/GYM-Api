require("dotenv").config();
const express = require("express");
const router = express.Router();
const Member = require("../models/member");
const MembershipPlan = require("../models/MembershipPlan");

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API for managing gym members
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     description: Retrieve a list of all gym members.
 *     responses:
 *       200:
 *         description: A list of members.
 *       500:
 *         description: Server error.
 */

router.get("/", async (req, res) => {
  try {
    const members = await Member.findAll({
      include: MembershipPlan,
    });
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/members/Active:
 *   get:
 *     summary: Get all active members
 *     tags: [Members]
 *     description: Retrieve all currently active gym members.
 *     responses:
 *       200:
 *         description: A list of active members.
 *       404:
 *         description: No active members found.
 *       500:
 *         description: Server error.
 */

router.get("/Active", async (req, res) => {
  try {
    const members = await Member.findAll({
      where: { status: "Active" },
      include: [{ model: MembershipPlan }],
      attributes: { exclude: ["password"] },
    });

    if (members.length === 0) {
      return res.status(404).json({ message: "لا يوجد أعضاء مشتركين حاليًا" });
    }

    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/members/{memberID}:
 *   get:
 *     summary: Get a member by ID
 *     tags: [Members]
 *     description: Retrieve details of a specific gym member by ID.
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         description: ID of the member to retrieve
 *     responses:
 *       200:
 *         description: Member details.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Server error.
 */

router.get("/:memberID", async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.memberID, {
      include: MembershipPlan,
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Add a new member
 *     tags: [Members]
 *     description: Add a new gym member to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               status:
 *                 type: string
 *                 example: "Active"
 *               membershipPlanId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Member added successfully.
 *       500:
 *         description: Server error.
 */

router.post("/", async (req, res) => {
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json({
      member: newMember,
      message: "Member added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/members/{memberID}:
 *   patch:
 *     summary: Update a member
 *     tags: [Members]
 *     description: Update details of an existing gym member.
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         description: ID of the member to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               status:
 *                 type: string
 *                 example: "Inactive"
 *     responses:
 *       200:
 *         description: Member updated successfully.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Server error.
 */

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

/**
 * @swagger
 * /api/members/{memberID}:
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
 *     description: Remove a gym member from the database.
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         description: ID of the member to delete
 *     responses:
 *       200:
 *         description: Member deleted successfully.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Server error.
 */

router.delete("/:memberID", async (req, res) => {
  try {
    const deleted = await Member.destroy({
      where: { MemberID: req.params.memberID },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
