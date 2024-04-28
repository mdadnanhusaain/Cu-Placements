const express = require("express");
const router = express.Router();
const multer = require("multer");

const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });

const wrapAsync = require("../utility/wrapAsync.js");
const companyController = require("../controllers/company.js");

const {
  isAdmin,
  saveRedirectUrl,
  isLoggedIn,
  isStudent,
  isEligible,
} = require("../middlewares/middleware.js");

let companyFiles = upload.fields([
  { name: "company[file][image]", maxCount: 1 },
  { name: "company[file][jd]", maxCount: 1 },
]);

router.get(
  "/all",
  saveRedirectUrl,
  isLoggedIn,
  isAdmin,
  wrapAsync(companyController.allDrive)
);

router.get(
  "/about/:id",
  saveRedirectUrl,
  isLoggedIn,
  wrapAsync(companyController.about)
);

router
  .route("/add")
  .get(saveRedirectUrl, isLoggedIn, isAdmin, companyController.addForm)
  .post(
    companyFiles,
    saveRedirectUrl,
    isLoggedIn,
    isAdmin,
    wrapAsync(companyController.addCompany)
  );

router
  .route("/edit/:id")
  .get(saveRedirectUrl, isLoggedIn, isAdmin, companyController.editForm)
  .post(
    companyFiles,
    saveRedirectUrl,
    isLoggedIn,
    isAdmin,
    wrapAsync(companyController.editCompany)
  );

router.post(
  "/apply/:id",
  saveRedirectUrl,
  isLoggedIn,
  isEligible,
  wrapAsync(companyController.apply)
);

router.post(
  "/end/:id",
  saveRedirectUrl,
  isLoggedIn,
  isAdmin,
  wrapAsync(companyController.endDrive)
);

module.exports = router;
