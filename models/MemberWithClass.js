const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MemberWithClass = sequelize.define(
  "MemberWithClass",
  {
    member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    class_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "memberwithclass",
    timestamps: false,
  }
);

module.exports = MemberWithClass;
