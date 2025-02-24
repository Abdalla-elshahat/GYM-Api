const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MemberWithTrainer = sequelize.define(
  "MemberWithTrainer",
  {
    member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "memberwithtrainer",
    timestamps: false,
  }
);

module.exports = MemberWithTrainer;
