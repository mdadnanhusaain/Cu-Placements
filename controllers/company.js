const Company = require("../models/company.js");
const User = require("../models/user.js");

module.exports.allDrive = async (req, res) => {
  let companies = await Company.find({});
  for (let i in companies) {
    let company = companies[i];
    await company.populate({
      path: "students",
      populate: {
        path: "companies",
      },
    });
  }
  res.render("pages/driveDetails.ejs", { companies });
};

module.exports.about = async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  if (company.students.includes(res.locals.currUser._id)) {
    let applied = 1;
  } else {
    let applied = 0;
  }
  res.render("pages/aboutCompany.ejs", { company, applied });
};

module.exports.addForm = (req, res) => {
  res.render("pages/addCompany.ejs");
};

module.exports.addCompany = async (req, res) => {
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
    console.log("New Company added : " + savedCompany);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  res.render("pages/editCompany.ejs", { company, pdf: process.env.PDF });
};

module.exports.editCompany = async (req, res) => {
  try {
    let { id } = req.params;

    let company = req.body.company;
    let newCompany = await Company.findByIdAndUpdate(id, { ...company });

    if (req.files["company[file][image]"] !== undefined) {
      let logoDetails = req.files["company[file][image]"][0];

      newCompany.file.image.url = logoDetails.path;
      newCompany.file.image.filename = logoDetails.originalname;
    }

    if (req.files["company[file][jd]"] !== undefined) {
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

      newCompany.file.jd.url = url;
      newCompany.file.jd.filename = jdFilename;
    }

    let savedCompany = await newCompany.save();
    console.log("Company Details edited : " + savedCompany);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};

module.exports.apply = async (req, res) => {
  let { id } = req.params;
  let userId = res.locals.currUser._id;
  try {
    let company = await Company.findById(id);
    company.students.push(userId);
    let newCompany = await company.save();

    let student = await User.findById(userId);
    student.companies.push(id);
    let newStudent = await student.save();

    console.log(`${newStudent.name} has applied for ${newCompany.name}`);

    req.flash("success", `Successfully applied to ${company.name}`);
    res.redirect(`/student/myCompanies/#${id}`);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(`/company/about/${id}`);
  }
};

module.exports.endDrive = async (req, res) => {
  try {
    let { id } = req.params;
    let company = await Company.findById(id);
    console.log(company);
    company.active = 1;
    company = await Company.findByIdAndUpdate(id, { ...company });
    let savedCompany = await company.save();
    console.log(`Drive for ${savedCompany.name} has ended now!`);
    req.flash(
      "success",
      `Drive for ${savedCompany.name} has been ended successfully!`
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect("/");
};
