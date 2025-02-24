const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Equipment = sequelize.define(
  "Equipment",
  {
    EquipmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    EquipmentName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    EquipmentType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    PurchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    LastMaintenanceDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "Equipment",
    timestamps: false,
  }
);

module.exports = Equipment;
