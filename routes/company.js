const express = require("express");
const router = express.Router();
const multer = require("multer");

const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });

const wrapAsync = require("../utility/wrapAsync.js");
const companyController = require("../controllers/company.js");

const { isAdmin } = require("../middlewares/middleware.js");

let companyFiles = upload.fields([
  { name: "company[file][image]", maxCount: 1 },
  { name: "company[file][jd]", maxCount: 1 },
]);

router.get("/about/:id", wrapAsync(companyController.about));

router
  .route("/add")
  .get(companyController.addForm)
  .post(companyFiles, isAdmin, wrapAsync(companyController.addCompany));

router
  .route("/edit/:id")
  .get(companyController.editForm)
  .post(companyFiles, isAdmin, wrapAsync(companyController.editCompany));

router.post("/end/:id", isAdmin, wrapAsync(companyController.endDrive));

module.exports = router;
