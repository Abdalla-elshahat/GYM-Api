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
      type: DataTypes.DATE,
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
    numofmember: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TrainerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    tableName: "Class",
    timestamps: false,
  }
);

module.exports = Class;
