require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");

const Company = require("./models/company.js");
const Admin = require("./models/admin.js");
const Student = require("./models/student.js");

const { storage } = require("./config/cloudConfig.js");
const { log } = require("console");
const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

// MongoDB Connection
async function main() {
  // await mongoose.connect(process.env.ATLAS_URL);
  await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DATABASE}`);
}

main()
  .then((res) => {
    console.log("Successfully connected to Database\n");
  })
  .catch((err) => {
    console.log(err);
  });

// Page Routes

app.get("/", async (req, res) => {
  let companies = await Company.find({});
  res.render("pages/Home.ejs", { companies });
});

app.get("/aboutCompany", (req, res) => {
  res.render("pages/aboutCompany.ejs");
});

let companyFiles = upload.fields([
  { name: "company[file][image]", maxCount: 1 },
  { name: "company[file][jd]", maxCount: 1 },
]);
app.get("/addCompany", (req, res) => {
  res.render("pages/addCompany.ejs");
});
app.post("/addCompany", companyFiles, async (req, res) => {
  try {
    let company = req.body.company;
    let newCompany = new Company(company);

    let logoDetails = req.files["company[file][image]"][0];
    let jdDetails = req.files["company[file][jd]"][0];

    let jdFilename = jdDetails.originalname;
    jdFilename = jdFilename.split(".");
    jdFileExt = jdFilename[1];
    jdFilename = jdFilename[0];
    jdFilename = jdFilename.replaceAll(" ", "_");

    let url = jdDetails.path;
    let urlArray = url.split("upload");
    url = urlArray[0] + "upload/fl_attachment:" + jdFilename + urlArray[1];
    jdFilename = jdFilename + `.${jdFileExt}`;

    newCompany.file.image.url = logoDetails.path;
    newCompany.file.image.filename = logoDetails.originalname;
    newCompany.file.jd.url = url;
    newCompany.file.jd.filename = jdFilename;

    let savedCompany = await newCompany.save();
    console.log(savedCompany);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/editCompany", (req, res) => {
  res.render("pages/editCompany.ejs");
});

app.get("/profile", (req, res) => {
  res.render("pages/profile.ejs");
});

app.get("/myCompanies", (req, res) => {
  res.render("pages/myCompanies.ejs");
});

app.get("/editProfile", (req, res) => {
  res.render("pages/editProfile.ejs");
});

// User Routes

app.get("/Alogin", (req, res) => {
  res.render("user/ALogin.ejs");
});
app.post("/Alogin", (req, res) => {
  // res.render("user/ALogin.ejs");
});

app.get("/Asignup", (req, res) => {
  res.render("user/ASignup.ejs");
});
app.post("/Asignup", (req, res) => {
  // res.render("user/ASignup.ejs");
});

app.get("/Slogin", (req, res) => {
  res.render("user/SLogin.ejs");
});
app.post("/Slogin", (req, res) => {
  // res.render("user/SLogin.ejs");
});

app.get("/Ssignup", (req, res) => {
  res.render("user/SSignup.ejs");
});
app.post("/Ssignup", (req, res) => {
  // res.render("user/SSignup.ejs");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
