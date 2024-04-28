const express = require("express");
const router = express.Router();
const passport = require("passport");

const adminController = require("../controllers/admin.js");
const wrapAsync = require("../utility/wrapAsync.js");
const { isAdmin, saveRedirectUrl } = require("../middlewares/middleware.js");

router
  .route("/signup")
  .get(adminController.signupForm)
  .post(wrapAsync(adminController.signupAdmin));

router
  .route("/login")
  .get(adminController.loginForm)
  .post(
    saveRedirectUrl,
    isAdmin,
    passport.authenticate("local", {
      failureRedirect: "/admin/login",
      failureFlash: true,
    }),
    wrapAsync(adminController.loginAdmin)
  );

router.get("/logout", adminController.logout);

module.exports = router;
