const express = require("express");
const Equipment = require("../models/Equipment");
const Maintenance = require("../models/Maintenance");
const router = express.Router();

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
 *       500:
 *         description: Server error.
 */
// ✅ جلب جميع المعدات
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await Equipment.findAll({
      include:Maintenance
    });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/equipment/{eqID}:
 *   get:
 *     summary: Get specific equipment by ID
 *     tags: [Equipment]
 *     description: Retrieve details of a specific equipment record.
 *     parameters:
 *       - in: path
 *         name: eqID
 *         required: true
 *         description: ID of the equipment to retrieve
 *     responses:
 *       200:
 *         description: Equipment details.
 *       404:
 *         description: Equipment not found.
 *       500:
 *         description: Server error.
 */
// ✅ جلب بيانات معدات معينة
router.get("/:eqID", async (req, res) => {
  try {
    const records = await Equipment.findAll({ 
      where: { EquipmentID: req.params.eqID },
      include :Maintenance
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Add new equipment
 *     tags: [Equipment]
 *     description: Add a new equipment record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Equipment added successfully.
 *       500:
 *         description: Server error.
 */
// ✅ إضافة معدات جديدة
router.post("/", async (req, res) => {
  const data=req.body
  try {
    const eq = await Equipment.create(data);
    res.status(201).json({ message: "Equipment added successfully", data: eq });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/equipment/{eqID}:
 *   put:
 *     summary: Update equipment data
 *     tags: [Equipment]
 *     description: Update an existing equipment record.
 *     parameters:
 *       - in: path
 *         name: eqID
 *         required: true
 *         description: ID of the equipment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Equipment updated successfully.
 *       404:
 *         description: Equipment not found.
 *       500:
 *         description: Server error.
 */
// ✅ تحديث بيانات معدات
router.put("/:eqID", async (req, res) => {
  try {
    // Find the equipment record
    const record = await Equipment.findOne({
      where: { EquipmentID: req.params.eqID },
    });

    if (!record) {
      return res.status(404).json({ message: "No equipment record found" });
    }

    // Update the record with new data from the request
    const updatedRecord = await Equipment.update(req.body, {
      where: { EquipmentID: req.params.eqID },
    });

    const record2 = await Equipment.findOne({
      where: { EquipmentID: req.params.eqID },
    });
    // Check if the record was updated successfully
    if (updatedRecord[0] === 0) {
      return res.status(400).json({ message: "Failed to update equipment data" });
    }

    res.json({ message: "Equipment updated successfully", data: record2 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
 *         description: ID of the equipment to delete
 *     responses:
 *       200:
 *         description: Equipment and related maintenance records deleted.
 *       404:
 *         description: Equipment not found.
 *       500:
 *         description: Server error.
 */
// ✅ حذف معدات
router.delete('/:eqID', async (req, res) => {
  try {
    const { eqID } = req.params;
    await Maintenance.destroy({ where: { EquipmentID: Number(eqID) } });
    const deleted = await Equipment.destroy({ where: { EquipmentID: Number(eqID) } });
    if (deleted) {
      res.json({ message: 'Equipment and related maintenance records deleted' });
    } else {
      res.status(404).json({ message: 'Equipment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
