const express = require("express");
const router = express.Router();
const ClassController = require("../controllers/ClassController");

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API for managing classes
 */

/**
 * @swagger
 * /api/class:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     description: Retrieve a list of all available classes.
 *     responses:
 *       200:
 *         description: A list of classes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", ClassController.getAllClasses);

/**
 * @swagger
 * /api/class/{ClassID}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: ClassID
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Class details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:ClassID", ClassController.getClassById);

/**
 * @swagger
 * /api/class:
 *   post:
 *     summary: Add a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassInput'
 *     responses:
 *       201:
 *         description: Class created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", ClassController.createClass);

/**
 * @swagger
 * /api/class/{classId}:
 *   put:
 *     summary: Update a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassInput'
 *     responses:
 *       200:
 *         description: Class updated successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:classId", ClassController.updateClass);

/**
 * @swagger
 * /api/class/{classId}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Class deleted successfully.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:classId", ClassController.deleteClass);

module.exports = router;
