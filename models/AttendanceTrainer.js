const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AttendanceTrainer = sequelize.define("AttendanceTrainer",
  {
    AttendanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TrainerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CheckInTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    CheckOutTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "AttendanceTrainer",
    timestamps: false,
  }
);

module.exports = AttendanceTrainer;
