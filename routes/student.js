const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

const studentController = require("../controllers/student.js");
const wrapAsync = require("../utility/wrapAsync.js");
const {
  saveRedirectUrl,
  isAdmin,
  isStudent,
  isLoggedIn,
} = require("../middlewares/middleware.js");

const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });

let studentFiles = upload.fields([
  { name: "student[file][image]", maxCount: 1 },
  { name: "student[file][resume]", maxCount: 1 },
]);

router
  .route("/signup")
  .get(studentController.signupForm)
  .post(studentFiles, wrapAsync(studentController.signupStudent));

router
  .route("/login")
  .get(studentController.loginForm)
  .post(
    saveRedirectUrl,
    isStudent,
    passport.authenticate("local", {
      failureRedirect: "/student/login",
      failureFlash: true,
    }),
    wrapAsync(studentController.loginStudent)
  );

router.route("/profile/:username").get(isLoggedIn, studentController.profile);

router
  .route("/editProfile")
  .get(isLoggedIn, isStudent, studentController.editProfile)
  .post(
    studentFiles,
    isLoggedIn,
    isStudent,
    wrapAsync(studentController.updateProfile)
  );

router.get("/myCompanies", isLoggedIn, isStudent, studentController.companies);

router.get("/all", isLoggedIn, isAdmin, studentController.allStudents);

router.get("/logout", studentController.logout);

module.exports = router;
