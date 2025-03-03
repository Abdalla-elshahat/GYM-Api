const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const Trainer = require("../models/Trainer");

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
 *       500:
 *         description: Server error.
 */
// ✅ جلب جميع Classs
router.get("/", async (req, res) => {
  try {
    const Classs = await Class.findAll();
    res.status(200).json(Classs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/class/{ClassID}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     description: Retrieve details of a specific class by its ID.
 *     parameters:
 *       - in: path
 *         name: ClassID
 *         required: true
 *         description: ID of the class to retrieve
 *     responses:
 *       200:
 *         description: Class details.
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Server error.
 */
// ✅ جلب اشتراك معين عبر ClassID
router.get("/:ClassID", async (req, res) => {
  try {
    const Classs = await Class.findByPk(req.params.ClassID,{
      include:Trainer
        });
    res.json(Classs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/class:
 *   post:
 *     summary: Add a new class
 *     tags: [Classes]
 *     description: Add a new class to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TrainerID:
 *                 type: integer
 *               ClassName:
 *                 type: string
 *               ClassDescription:
 *                 type: string
 *               ClassDate:
 *                 type: string
 *                 format: date
 *               Duration:
 *                 type: integer
 *               MaxParticipants:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Class created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
// ✅ اضافه class جديد
router.post("/", async (req, res) => {
  try {
    const { TrainerID, ClassName, ClassDescription, ClassDate, Duration, MaxParticipants } = req.body;

    if (!TrainerID || !ClassName || !ClassDate || !Duration || !MaxParticipants) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/class/{classId}:
 *   put:
 *     summary: Update a class
 *     tags: [Classes]
 *     description: Update an existing class.
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: ID of the class to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TrainerID:
 *                 type: integer
 *               ClassName:
 *                 type: string
 *               ClassDescription:
 *                 type: string
 *               ClassDate:
 *                 type: string
 *                 format: date
 *               Duration:
 *                 type: integer
 *               MaxParticipants:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Class updated successfully.
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Server error.
 */
// ✅ class تعديل
router.put("/:classId", async (req, res) => {
  try {
    const classData = await Class.findByPk(req.params.classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    await Class.update(req.body, { where: { ClassID: req.params.classId } });

    const updatedClass = await Class.findByPk(req.params.classId);
    res.json(updatedClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/class/{classId}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
 *     description: Remove a class from the database.
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         description: ID of the class to delete
 *     responses:
 *       200:
 *         description: Class deleted successfully.
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Server error.
 */
// ✅ class حذف
router.delete("/:classId", async (req, res) => {
  try {
    const classData = await Class.findByPk(req.params.classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    await Class.destroy({ where: { ClassID: req.params.classId } });

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
