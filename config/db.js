const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("GYM", "abdalla", "4749*afa", {
  host: "DESKTOP-7C4IGRO",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false, // 🔹 قد تحتاج لتغيير هذا حسب إعداداتك
    },
  },
  logging: false, // ✅ تعطيل تسجيل الاستعلامات
});

// ✅ فحص الاتصال
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to the database successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}
testConnection();

module.exports = sequelize;
