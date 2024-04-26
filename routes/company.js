const express = require("express");
const router = express.Router();
const multer = require("multer");

const companyController = require("../controllers/company.js");

const { storage } = require("../config/cloudConfig.js");
const upload = multer({ storage });

router.route("/about/:id").get(companyController.about);

let companyFiles = upload.fields([
  { name: "company[file][image]", maxCount: 1 },
  { name: "company[file][jd]", maxCount: 1 },
]);

router
  .route("/add")
  .get(companyController.addForm)
  .post(companyFiles, companyController.addCompany);

router
  .route("/edit/:id")
  .get(companyController.editForm)
  .post(companyFiles, companyController.editCompany);

module.exports = router;
