const express = require("express");
const Equipment = require("../models/Equipment");
const Maintenance = require("../models/Maintenance");
const router = express.Router();

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
 *     description: Retrieve a list of all maintenance records.
 *     responses:
 *       200:
 *         description: A list of maintenance records.
 *       500:
 *         description: Server error.
 */
// ✅ جلب جميع عمليات الصيانة
router.get("/", async (req, res) => {
  try {
    const Maintenanc= await Maintenance.findAll({});
    res.status(200).json(Maintenanc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/maintenance/{ID}:
 *   get:
 *     summary: Get maintenance record by ID
 *     tags: [Maintenance]
 *     description: Retrieve details of a specific maintenance record.
 *     parameters:
 *       - in: path
 *         name: ID
 *         required: true
 *         description: ID of the maintenance record to retrieve
 *     responses:
 *       200:
 *         description: Maintenance record details.
 *       404:
 *         description: Maintenance record not found.
 *       500:
 *         description: Server error.
 */
// ✅جلب بيانات صيانة معينة
router.get("/:ID", async (req, res) => {
  try {
    const records = await Maintenance.findAll({ 
      where: { MaintenanceID: req.params.ID },
      include: Equipment 
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/maintenance/{EqID}:
 *   post:
 *     summary: Add new maintenance record
 *     tags: [Maintenance]
 *     description: Add a new maintenance record.
 *     parameters:
 *       - in: path
 *         name: EqID
 *         required: true
 *         description: ID of the equipment to associate maintenance with
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Maintenance record added successfully.
 *       500:
 *         description: Server error.
 */
// ✅ إضافة سجل صيانة جديد
router.post("/:EqID", async (req, res) => {
  try {
    const checkInRecord = await Maintenance.create({
      EquipmentID:req.params.EqID,
      MaintenanceDate:Date.now(),
      ...req.body});
    res.status(201).json({ message: "maintance is  successfully", data: checkInRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/maintenance/{EqID}:
 *   put:
 *     summary: Update maintenance record
 *     tags: [Maintenance]
 *     description: Update an existing maintenance record.
 *     parameters:
 *       - in: path
 *         name: EqID
 *         required: true
 *         description: ID of the equipment whose maintenance record needs updating
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully.
 *       404:
 *         description: Maintenance record not found.
 *       500:
 *         description: Server error.
 */
// ✅  تحديث بيانات صيانة
router.put("/:EqID", async (req, res) => {
  try {
    const  {EqID} = req.params;
    const record = await Maintenance.findOne({
      where: {EquipmentID: EqID},
    });

    if (!record) {
      return res.status(404).json({ message: "No Maintenance found" });
    }
    const data = await Maintenance.update({MaintenanceDate:Date.now(),...req.body},{
      where: {EquipmentID: EqID},
    });
    const record2 = await Maintenance.findOne({
      where: {EquipmentID: EqID},
    });
    res.json({ message: "Maintenance out successfully", data:record2 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/maintenance/{EqID}:
 *   delete:
 *     summary: Delete maintenance record
 *     tags: [Maintenance]
 *     description: Delete a maintenance record.
 *     parameters:
 *       - in: path
 *         name: EqID
 *         required: true
 *         description: ID of the equipment whose maintenance record needs deleting
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully.
 *       404:
 *         description: Maintenance record not found.
 *       500:
 *         description: Server error.
 */
// ✅ حذف سجل صيانة
router.delete("/:EqID", async (req, res) => {
  try {
    const  {EqID} = req.params;
    const record = await Maintenance.findOne({
      where: {EquipmentID: EqID},
    });

    if (!record) {
      return res.status(404).json({ message: "No Equipment found" });
    }
    const data = await Maintenance.destroy({
      where: {EquipmentID:EqID},
    });
    res.json({ message: "maintains deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
