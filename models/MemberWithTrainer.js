const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MemberWithTrainer = sequelize.define(
  "MemberWithTrainer",
  {
    member_id: {
      type: DataTypes.INTEGER,
    },
    trainer_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "memberwithtrainer",
    timestamps: false,
  }
);

module.exports = MemberWithTrainer;
