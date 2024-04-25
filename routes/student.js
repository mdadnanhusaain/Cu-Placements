const express = require("express");
const router = express.Router();
const multer = require("multer");

const studentController = require("../controllers/student.js");

router
  .route("/login")
  .get(studentController.loginForm)
  .post(studentController.loginStudent);

router
  .route("/signup")
  .get(studentController.signupForm)
  .post(studentController.signupStudent);

router
  .route("/profile")
  .get(studentController.profile)
  .post(studentController.editProfile);

router.route("/myCompanies").get(studentController.companies);

module.exports = router;
