const express = require("express");
const Class = require("../models/Class");
const Member = require("../models/member");
const MemberWithClass = require("../models/MemberWithClass");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: member-Classes
 *   description: API for managing class memberships
 */

/**
 * @swagger
 * /api/classes/{class_id}/members:
 *   get:
 *     summary: Get all members in a specific class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         required: true
 *         description: ID of the class
 *     responses:
 *       200:
 *         description: List of members in the class.
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Server error.
 */
// ✅جلب جميع الأعضاء في فصل معين
router.get("/class/:class_id/members", async (req, res) => {
  try {
    const { class_id } = req.params;

    const classItem = await Class.findByPk(class_id, {
      include: [
        {
          model: Member,
          through: MemberWithClass,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    if (!classItem) {
      return res.status(404).json({ message: "الفصل غير موجود" });
    }

    res.status(200).json({ members: classItem.Members });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/members/{member_id}/classes:
 *   get:
 *     summary: Get all classes a member belongs to
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: member_id
 *         required: true
 *         description: ID of the member
 *     responses:
 *       200:
 *         description: List of classes the member is enrolled in.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Server error.
 */
// ✅جلب جميع الفصول التي ينتمي إليها عضو معين
router.get("/member/:member_id/classes", async (req, res) => {
  try {
    const { member_id } = req.params;

    const member = await Member.findByPk(member_id, {
      include: [{ model: Class, through: MemberWithClass }],
    });

    if (!member) {
      return res.status(404).json({ message: "العضو غير موجود" });
    }

    res.status(200).json({ classes: member.Classes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/classes/{member_id}:
 *   post:
 *     summary: Add a member to a class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Member added to the class successfully.
 *       400:
 *         description: Class is full.
 *       404:
 *         description: Member or class not found.
 *       500:
 *         description: Server error.
 */
// ✅إضافة عضو إلى فصل معين
router.post("/:member_id", async (req, res) => {
  const { member_id } = req.params;
  const { class_id } = req.body;
  try {
    const member = await Member.findByPk(member_id);
    const classItem = await Class.findByPk(class_id);

    if (!member || !classItem) {
      return res.status(404).json({ message: "العضو أو الفصل غير موجود" });
    }

    if (classItem.numofmember >= classItem.MaxParticipants) {
      return res.status(400).json({ message: "This class is full" });
    }

    await classItem.update({ numofmember: classItem.numofmember + 1 });

    await MemberWithClass.create({ member_id, class_id });

    res.status(201).json({ message: "تمت إضافة العضو إلى الفصل بنجاح" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/classes/{member_id}:
 *   delete:
 *     summary: Remove a member from a class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Member removed from the class successfully.
 *       404:
 *         description: Relationship not found.
 *       500:
 *         description: Server error.
 */
// ✅إزالة عضو من فصل
router.delete("/:member_id", async (req, res) => {
  const { member_id } = req.params;
  const { class_id } = req.body;
  try {
    const classItem = await Class.findByPk(class_id);
    // التحقق من وجود العلاقة
    const record = await MemberWithClass.findOne({
      where: { member_id, class_id },
    });

    if (!record) {
      return res.status(404).json({ message: "العلاقة غير موجودة" });
    }
    await classItem.update({ numofmember: classItem.numofmember - 1 });
    await record.destroy();

    res.status(200).json({ message: "تمت إزالة العضو من الفصل بنجاح" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
