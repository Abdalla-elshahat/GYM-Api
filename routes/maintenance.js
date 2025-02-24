const express = require("express");
const Equipment = require("../models/Equipment");
const Maintenance = require("../models/Maintenance");
const router = express.Router();


// ✅ جلب جميع عمليات الصيانة
router.get("/", async (req, res) => {
  try {
    const Maintenanc= await Maintenance.findAll({});
    res.status(200).json(Maintenanc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
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
