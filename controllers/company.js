const Company = require("../models/company.js");

module.exports.about = (req, res) => {
  let { id } = req.params;
  res.render("pages/aboutCompany.ejs", { id });
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
    console.log(savedCompany);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let company = await Company.findById(id);
  console.log(company);
  res.render("pages/editCompany.ejs", { company });
};

module.exports.editCompany = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    let company = req.body.company;
    let newCompany = await Company.findByIdAndUpdate(id, { ...company });

    if (typeof req.files !== "undefined") {
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
    }

    let savedCompany = await newCompany.save();
    console.log(savedCompany);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
