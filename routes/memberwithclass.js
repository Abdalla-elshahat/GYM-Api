const express = require("express");
const router = express.Router();
const MemberClassController = require("../controllers/MemberClassController");

/**
 * @swagger
 * tags:
 *   name: member-Classes
 *   description: API for managing class memberships
 */

/**
 * @swagger
 * /api/MemberWithClass/class/{class_id}/members:
 *   get:
 *     summary: Get all members in a specific class
 *     tags: [member-Classes]
 *     parameters:
 *       - in: path
 *         name: class_id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of members in the class.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/class/:class_id/members", MemberClassController.getMembersInClass);

/**
 * @swagger
 * /api/MemberWithClass/member/{member_id}/classes:
 *   get:
 *     summary: Get all classes a member belongs to
 *     tags: [member-Classes]
 *     parameters:
 *       - in: path
 *         name: member_id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of classes the member is enrolled in.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/member/:member_id/classes", MemberClassController.getClassesForMember);

/**
 * @swagger
 * /api/MemberWithClass/{member_id}:
 *   post:
 *     summary: Add a member to a class
 *     tags: [member-Classes]
 *     parameters:
 *       - in: path
 *         name: member_id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_id: { type: integer }
 *     responses:
 *       201:
 *         description: Member added to the class successfully.
 *       400:
 *         description: Class is full.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/:member_id", MemberClassController.addMemberToClass);

/**
 * @swagger
 * /api/MemberWithClass/{member_id}:
 *   delete:
 *     summary: Remove a member from a class
 *     tags: [member-Classes]
 *     parameters:
 *       - in: path
 *         name: member_id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               class_id: { type: integer }
 *     responses:
 *       200:
 *         description: Member removed from the class successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:member_id", MemberClassController.removeMemberFromClass);

module.exports = router;
