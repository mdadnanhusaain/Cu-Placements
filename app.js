require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const multer = require("multer");

const Company = require("./models/company.js");

const { storage } = require("./config/cloudConfig.js");
const upload = multer({ storage });

const studentRouter = require("./routes/student.js");
const adminRouter = require("./routes/admin.js");
const companyRouter = require("./routes/company.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

// MongoDB Connection
async function main() {
  await mongoose.connect(process.env.ATLAS_URL);
  // await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DATABASE}`);
}

main()
  .then((res) => {
    console.log("Successfully connected to Database\n");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  let companies = await Company.find({});
  res.render("pages/Home.ejs", { companies });
});

// Company Routes
app.use("/company", companyRouter);

// Student Routes
app.use("/student", studentRouter);

// Admin Routes
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
