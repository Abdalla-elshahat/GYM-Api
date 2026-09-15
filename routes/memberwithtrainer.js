const express = require("express");
const router = express.Router();
const MemberTrainerController = require("../controllers/MemberTrainerController");

/**
 * @swagger
 * tags:
 *   name: Member-Trainer
 *   description: API for managing relationships between members and trainers
 */

/**
 * @swagger
 * /api/MemberWithTrainer/trainer/{trainer_id}/members:
 *   get:
 *     summary: Get all members assigned to a specific trainer
 *     tags: [Member-Trainer]
 *     parameters:
 *       - in: path
 *         name: trainer_id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of members assigned to the trainer.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/trainer/:trainer_id/members", MemberTrainerController.getMembersForTrainer);

/**
 * @swagger
 * /api/MemberWithTrainer/member/{member_id}/trainers:
 *   get:
 *     summary: Get all trainers for a specific member
 *     tags: [Member-Trainer]
 *     parameters:
 *       - in: path
 *         name: member_id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of trainers assigned to the member.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/member/:member_id/trainers", MemberTrainerController.getTrainersForMember);

/**
 * @swagger
 * /api/MemberWithTrainer/{member_id}:
 *   post:
 *     summary: Assign a member to a trainer
 *     tags: [Member-Trainer]
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
 *               trainer_id: { type: integer }
 *     responses:
 *       201:
 *         description: Member assigned to trainer successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/:member_id", MemberTrainerController.assignMemberToTrainer);

/**
 * @swagger
 * /api/MemberWithTrainer/{member_id}:
 *   delete:
 *     summary: Remove a member from a trainer
 *     tags: [Member-Trainer]
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
 *               trainer_id: { type: integer }
 *     responses:
 *       200:
 *         description: Member removed from trainer successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:member_id", MemberTrainerController.removeMemberFromTrainer);

module.exports = router;
