const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Class = sequelize.define(
  "Class",
  {
    ClassID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ClassName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ClassDescription: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ClassDate: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MaxParticipants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TrainerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Class",
    timestamps: false,
  }
);

module.exports = Class;
