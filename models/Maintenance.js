const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Maintenance = sequelize.define(
  "Maintenance",
  {
    MaintenanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    EquipmentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    MaintenanceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Technician: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Notes: {
      type: DataTypes.TEXT(255),
      allowNull: true,
    },
  },
  {
    tableName: "Maintenance",
    timestamps: false,
  }
);

module.exports = Maintenance;
