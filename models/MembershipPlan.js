const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MembershipPlan = sequelize.define(
  "MembershipPlan",
  {
    MembershipPlanID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PlanName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lesson: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "MembershipPlan",
    timestamps: false,
  }
);

module.exports = MembershipPlan;
