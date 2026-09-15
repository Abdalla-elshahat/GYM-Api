const express = require("express");
const router = express.Router();
const EquipmentController = require("../controllers/EquipmentController");

/**
 * @swagger
 * tags:
 *   name: Equipment
 *   description: API for managing equipment records
 */

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Get all equipment
 *     tags: [Equipment]
 *     description: Retrieve a list of all equipment along with their maintenance records.
 *     responses:
 *       200:
 *         description: A list of equipment.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", EquipmentController.getAllEquipment);

/**
 * @swagger
 * /api/equipment/{eqID}:
 *   get:
 *     summary: Get specific equipment by ID
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: eqID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Equipment details.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:eqID", EquipmentController.getEquipmentById);

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Add new equipment
 *     tags: [Equipment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipmentInput'
 *     responses:
 *       201:
 *         description: Equipment added successfully.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", EquipmentController.createEquipment);

/**
 * @swagger
 * /api/equipment/{eqID}:
 *   put:
 *     summary: Update equipment data
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: eqID
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EquipmentInput'
 *     responses:
 *       200:
 *         description: Equipment updated successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         description: Failed to update equipment data.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:eqID", EquipmentController.updateEquipment);

/**
 * @swagger
 * /api/equipment/{eqID}:
 *   delete:
 *     summary: Delete equipment
 *     tags: [Equipment]
 *     description: Delete an equipment record and its associated maintenance records.
 *     parameters:
 *       - in: path
 *         name: eqID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Equipment and related maintenance records deleted.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:eqID", EquipmentController.deleteEquipment);

module.exports = router;
