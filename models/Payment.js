const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
  "Payment",
  {
    PaymentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MemberID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    PaymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    PaymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING(10),
      defaultValue:"nonepaid"
    }
  },
  {
    tableName: "Payment",
    timestamps: false,
  }
);

module.exports = Payment;
