const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Feedback = sequelize.define(
  "Feedback",
  {
    FeedbackID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MemberID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TrainerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Comments: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Feedback",
    timestamps: false,
  }
);

module.exports = Feedback;
