const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
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
  },
  {
    tableName: "Trainer",
    timestamps: false,
  }
);

module.exports = Trainer;
