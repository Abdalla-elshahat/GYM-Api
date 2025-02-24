const Member = require("../models/member");
const Trainer = require("../models/Trainer");
const Class = require("../models/Class");
const Payment = require("../models/Payment");
const MembershipPlan = require("../models/MembershipPlan");
const Equipment = require("../models/Equipment");
const Maintenance = require("../models/Maintenance");
const Attendance = require("../models/Attendance");
const AttendencerTrainer = require("../models/AttendanceTrainer");
const Feedback = require("../models/Feedback");
const MemberWithTrainer = require("../models/MemberWithTrainer");
const MemberWithClass = require("../models/MemberWithClass");



// 🔹 العلاقة بين Member و Trainer (Many-to-Many)
Member.belongsToMany(Trainer, { through: MemberWithTrainer, foreignKey: "member_id" });
Trainer.belongsToMany(Member, { through: MemberWithTrainer, foreignKey: "trainer_id" });
// 🔹 العلاقة بين Member و Class (Many-to-Many)
Member.belongsToMany(Class, { through: MemberWithClass, foreignKey: "member_id" });
Class.belongsToMany(Member, { through: MemberWithClass, foreignKey: "class_id" });


// // 🔹 العلاقة بين Member و payment (one-to-Many)
// Payment.belongsTo(Member, { foreignKey: "MemberID" });
// Member.hasMany(Payment, { foreignKey: "MemberID" });

// 🔹 العلاقة بين Member و MembershipPlan (one-to-Many)
Member.belongsTo(MembershipPlan, { foreignKey: "MembershipPlanID" });
MembershipPlan.hasMany(Member, { foreignKey: "MembershipPlanID" });

// 🔹 العلاقة بين Member و Attendance (one-to-Many)
Attendance.belongsTo(Member, { foreignKey: "MemberID",onDelete: "CASCADE" });
Member.hasMany(Attendance, { foreignKey: "MemberID" });
// 🔹 العلاقة بين Trainer و Attendance (one-to-Many)
AttendencerTrainer.belongsTo(Trainer, { foreignKey: "TrainerID",onDelete: "CASCADE" });
Trainer.hasMany(AttendencerTrainer, { foreignKey: "TrainerID" });

// 🔹 العلاقة بين Trainer و Class  (one-to-Many)
Class.belongsTo(Trainer, { foreignKey: "TrainerID" });
Trainer.hasMany(Class, { foreignKey: "TrainerID" });

// 🔹 العلاقة بين Trainer و feedback  (one-to-Many)
Feedback.belongsTo(Trainer, { foreignKey: "TrainerID",onDelete: "CASCADE" });
Trainer.hasMany(Feedback, { foreignKey: "TrainerID" });
// 🔹 العلاقة بين member و feedback  (one-to-Many)
Feedback.belongsTo(Member, { foreignKey: "MemberID",onDelete: "CASCADE" });
Member.hasMany(Feedback, { foreignKey: "MemberID" });


// 🔹 العلاقة بين Equipment و Maintenance  (one-to-Many)
Maintenance.belongsTo(Equipment, { foreignKey: "EquipmentID",onDelete: "CASCADE"});
Equipment.hasMany(Maintenance,{ foreignKey: "EquipmentID"});

module.exports = {
  Member,
  Trainer,
  Class,
  Payment,
  MembershipPlan,
  Equipment,
  Maintenance,
  Attendance,
  Feedback,
  MemberWithTrainer,
  MemberWithClass,
};