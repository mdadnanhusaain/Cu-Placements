const express = require("express");
const router = express.Router();
const multer = require("multer");

const adminController = require("../controllers/admin.js");

router
  .route("/login")
  .get(adminController.loginForm)
  .post(adminController.loginAdmin);

router
  .route("/signup")
  .get(adminController.signupForm)
  .post(adminController.signupAdmin);

module.exports = router;
