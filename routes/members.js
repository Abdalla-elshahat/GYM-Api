const express = require("express");
const router = express.Router();
const MemberController = require("../controllers/MemberController");

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
 *     responses:
 *       200:
 *         description: A list of members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", MemberController.getAllMembers);

/**
 * @swagger
 * /api/members/Active:
 *   get:
 *     summary: Get all active members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of active members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/Active", MemberController.getActiveMembers);

/**
 * @swagger
 * /api/members/{memberID}:
 *   get:
 *     summary: Get a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Member details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:memberID", MemberController.getMemberById);

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Add a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberInput'
 *     responses:
 *       201:
 *         description: Member added successfully.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", MemberController.createMember);

/**
 * @swagger
 * /api/members/{memberID}:
 *   patch:
 *     summary: Update a member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberInput'
 *     responses:
 *       200:
 *         description: Member updated successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.patch("/:memberID", MemberController.updateMember);

/**
 * @swagger
 * /api/members/{memberID}:
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Member deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:memberID", MemberController.deleteMember);

module.exports = router;
