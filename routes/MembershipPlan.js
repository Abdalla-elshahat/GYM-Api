const express = require("express");
const router = express.Router();
const MembershipPlanController = require("../controllers/MembershipPlanController");

/**
 * @swagger
 * tags:
 *   name: MembershipPlans
 *   description: API for managing membership plans
 */

/**
 * @swagger
 * /api/MembershipPlan:
 *   get:
 *     summary: Get all membership plans
 *     tags: [MembershipPlans]
 *     responses:
 *       200:
 *         description: A list of all membership plans.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MembershipPlan'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", MembershipPlanController.getAllPlans);

/**
 * @swagger
 * /api/MembershipPlan/{planID}:
 *   get:
 *     summary: Get a membership plan by ID
 *     tags: [MembershipPlans]
 *     parameters:
 *       - in: path
 *         name: planID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Membership plan details.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:planID", MembershipPlanController.getPlanById);

/**
 * @swagger
 * /api/MembershipPlan:
 *   post:
 *     summary: Create a new membership plan
 *     tags: [MembershipPlans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MembershipPlanInput'
 *     responses:
 *       201:
 *         description: Membership plan created successfully.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", MembershipPlanController.createPlan);

/**
 * @swagger
 * /api/MembershipPlan/{MembershipPlanID}:
 *   put:
 *     summary: Update a membership plan
 *     tags: [MembershipPlans]
 *     parameters:
 *       - in: path
 *         name: MembershipPlanID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Membership plan updated successfully.
 *       400:
 *         description: Membership plan not found.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:MembershipPlanID", MembershipPlanController.updatePlan);

/**
 * @swagger
 * /api/MembershipPlan/{MembershipPlanID}:
 *   delete:
 *     summary: Delete a membership plan
 *     tags: [MembershipPlans]
 *     parameters:
 *       - in: path
 *         name: MembershipPlanID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Membership plan deleted successfully.
 *       400:
 *         description: Membership plan not found.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:MembershipPlanID", MembershipPlanController.deletePlan);

/**
 * @swagger
 * /api/MembershipPlan/renew/{MemberID}:
 *   put:
 *     summary: Renew a membership
 *     tags: [MembershipPlans]
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
 *             type: object
 *             properties:
 *               MembershipPlanID: { type: integer }
 *     responses:
 *       200:
 *         description: Membership renewed successfully.
 *       400:
 *         description: Membership not found.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:MemberID", MembershipPlanController.renewMembership);

module.exports = router;
