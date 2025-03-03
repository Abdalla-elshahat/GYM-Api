const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Attendance = sequelize.define("Attendance",
  {
    AttendanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MemberID: {
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
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "Attendance",
    timestamps: false,
  }
);

module.exports = Attendance;
