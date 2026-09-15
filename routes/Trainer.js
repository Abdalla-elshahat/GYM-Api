const express = require("express");
const TrainerController = require("../controllers/TrainerController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trainers
 *   description: API for managing trainers
 */

/**
 * @swagger
 * /api/Trainer:
 *   get:
 *     summary: Get all trainers
 *     tags: [Trainers]
 *     responses:
 *       200:
 *         description: A list of trainers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trainer'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", TrainerController.getAllTrainers);

/**
 * @swagger
 * /api/Trainer/{TrainerID}:
 *   get:
 *     summary: Get a trainer by ID
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Trainer details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:TrainerID", TrainerController.getTrainerById);

/**
 * @swagger
 * /api/Trainer:
 *   post:
 *     summary: Add a new trainer
 *     tags: [Trainers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerInput'
 *     responses:
 *       201:
 *         description: Trainer added successfully.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", TrainerController.createTrainer);

/**
 * @swagger
 * /api/Trainer/{TrainerID}:
 *   patch:
 *     summary: Update a trainer
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainerInput'
 *     responses:
 *       200:
 *         description: Trainer updated successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.patch("/:TrainerID", TrainerController.updateTrainer);

/**
 * @swagger
 * /api/Trainer/{TrainerID}:
 *   delete:
 *     summary: Delete a trainer
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Trainer deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:TrainerID", TrainerController.deleteTrainer);

/**
 * @swagger
 * /api/Trainer/{TrainerID}/classes:
 *   get:
 *     summary: Get all classes trained by a specific trainer
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of classes trained by the trainer.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:TrainerID/classes", TrainerController.getTrainerClasses);

/**
 * @swagger
 * /api/Trainer/{TrainerID}/members:
 *   get:
 *     summary: Get all members training with a specific trainer
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of members training with the trainer.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:TrainerID/members", TrainerController.getTrainerMembers);

/**
 * @swagger
 * /api/Trainer/salary/{TrainerID}:
 *   get:
 *     summary: Get the salary of a trainer
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: TrainerID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Trainer salary details.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/salary/:TrainerID", TrainerController.getTrainerSalary);

module.exports = router;
