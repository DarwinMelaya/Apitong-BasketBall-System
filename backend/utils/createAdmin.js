const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

const createInitialAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: "admin" });

    if (!adminExists) {
      await Admin.create({
        username: process.env.ADMIN_USERNAME || "admin",
        password: process.env.ADMIN_PASSWORD || "admin123",
      });
      console.log("Initial admin user created successfully");
    }
  } catch (error) {
    console.error("Error creating initial admin:", error);
  }
};

module.exports = createInitialAdmin;
