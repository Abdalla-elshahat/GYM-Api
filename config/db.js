const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",

    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },

    logging: false,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to SQL Server successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testConnection();

module.exports = sequelize;