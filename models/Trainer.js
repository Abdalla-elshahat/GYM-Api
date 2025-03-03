const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Class = require("./Class"); // استيراد الموديل عشان نربط البيانات

const Trainer = sequelize.define(
  "Trainer",
  {
    TrainerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Specialization: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    PhoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    HireDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    lesson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // عدد الحصص
    },
    fixedsalary:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "Trainer",
    timestamps: false,
  }
);

// ✅ **إضافة دوال لحساب الراتب بدل `VIRTUAL`**
Trainer.prototype.getSalaryOfLesson = async function () {
  const classes = await Class.findAll({ where: { TrainerID: this.TrainerID } });

  let totalSalary = 0;
  for (const cls of classes) {
    if (cls.numofmember && cls.price) {
      totalSalary += cls.numofmember * cls.price * 0.1;
    }
  }
  return totalSalary / (classes.length || 1); // تجنب القسمة على صفر
};

Trainer.prototype.getSalary = async function () {
  const salaryPerLesson = await this.getSalaryOfLesson();
  return this.lesson * salaryPerLesson;
};

module.exports = Trainer;
