const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

const wrapAsync = require("../utility/wrapAsync.js");
const { saveRedirectUrl } = require("../middlewares/middleware.js");
const studentController = require("../controllers/student.js");

router
  .route("/signup")
  .get(studentController.signupForm)
  .post(wrapAsync(studentController.signupStudent));

router
  .route("/login")
  .get(studentController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/student/login",
      failureFlash: true,
    }),
    wrapAsync(studentController.loginStudent)
  );

router.route("/profile").get(studentController.profile);

router
  .route("/editProfile")
  .get(studentController.editProfile)
  .post(wrapAsync(studentController.updateProfile));

router.route("/myCompanies").get(studentController.companies);

module.exports = router;
