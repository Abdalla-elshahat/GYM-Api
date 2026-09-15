const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/FeedbackController");

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: API for managing feedback
 */

/**
 * @swagger
 * /api/Feedback:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: A list of feedbacks.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", FeedbackController.getAllFeedback);

/**
 * @swagger
 * /api/Feedback/{FeedbackID}:
 *   get:
 *     summary: Get a feedback by ID
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: FeedbackID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Feedback details.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:FeedbackID", FeedbackController.getFeedbackById);

/**
 * @swagger
 * /api/Feedback/trainer/{TrainerID}:
 *   get:
 *     summary: Get all feedbacks for a specific trainer
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of feedbacks for the trainer.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/Trainer/:TrainerID", FeedbackController.getFeedbackByTrainer);

/**
 * @swagger
 * /api/Feedback/member/{MemberID}:
 *   get:
 *     summary: Get all feedbacks added by a specific member
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: MemberID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of feedbacks by the member.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/Member/:MemberID", FeedbackController.getFeedbackByMember);

/**
 * @swagger
 * /api/Feedback/{MemberID}:
 *   post:
 *     summary: Add a new feedback
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: MemberID
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackInput'
 *     responses:
 *       201:
 *         description: Feedback added successfully.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/:MemberID", FeedbackController.createFeedback);

/**
 * @swagger
 * /api/Feedback/{FeedbackID}:
 *   patch:
 *     summary: Update a feedback
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: FeedbackID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Feedback updated successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.patch("/:FeedbackID", FeedbackController.updateFeedback);

/**
 * @swagger
 * /api/Feedback/{FeedbackID}:
 *   delete:
 *     summary: Delete a feedback
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: FeedbackID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Feedback deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:FeedbackID", FeedbackController.deleteFeedback);

module.exports = router;
