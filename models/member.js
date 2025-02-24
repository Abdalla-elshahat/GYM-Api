const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Member = sequelize.define("Member", {
  MemberID: {
    type: DataTypes.INTEGER, // ✅ استخدام INTEGER مع autoIncrement
    primaryKey: true,
    autoIncrement: true, // ✅ يعمل فقط مع INTEGER
  },
  FirstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password:{
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  PhoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  DateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  JoinDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  MembershipPlanID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Status: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  lesson: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: null,
  }
}, 
{
  tableName: "Member", // ✅ إذا كنت تحتاج اسم الجدول صراحةً

  timestamps:false// ✅ تفعيل deletedAt
});

module.exports = Member;
