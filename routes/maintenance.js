const express = require("express");
const router = express.Router();
const MaintenanceController = require("../controllers/MaintenanceController");

/**
 * @swagger
 * tags:
 *   name: Maintenance
 *   description: API for managing maintenance records
 */

/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     summary: Get all maintenance records
 *     tags: [Maintenance]
 *     responses:
 *       200:
 *         description: A list of maintenance records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Maintenance'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", MaintenanceController.getAllMaintenance);

/**
 * @swagger
 * /api/maintenance/{ID}:
 *   get:
 *     summary: Get maintenance record by ID
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Maintenance record details.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:ID", MaintenanceController.getMaintenanceById);

/**
 * @swagger
 * /api/maintenance/{EqID}:
 *   post:
 *     summary: Add new maintenance record
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: EqID
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceInput'
 *     responses:
 *       201:
 *         description: Maintenance record added successfully.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/:EqID", MaintenanceController.createMaintenance);

/**
 * @swagger
 * /api/maintenance/{EqID}:
 *   put:
 *     summary: Update maintenance record
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: EqID
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MaintenanceInput'
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:EqID", MaintenanceController.updateMaintenance);

/**
 * @swagger
 * /api/maintenance/{EqID}:
 *   delete:
 *     summary: Delete maintenance record
 *     tags: [Maintenance]
 *     parameters:
 *       - in: path
 *         name: EqID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:EqID", MaintenanceController.deleteMaintenance);

module.exports = router;
