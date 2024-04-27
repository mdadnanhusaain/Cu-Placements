const User = require("../models/user.js");

module.exports.loginForm = (req, res) => {
  res.render("user/SLogin.ejs");
};
module.exports.loginStudent = async (req, res) => {
  try {
    let student = { ...req.body.student };
    let password = req.body.student.password;

    console.log(student);
    console.log(password);

    // let registeredStudent = new User();
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/student/signup");
  }
};

module.exports.signupForm = (req, res) => {
  res.render("user/SSignup.ejs");
};

module.exports.signupStudent = (req, res) => {
  res.render("user/SSignup.ejs");
};

module.exports.profile = (req, res) => {
  res.render("pages/profile.ejs");
};

module.exports.editProfile = (req, res) => {
  res.render("pages/editProfile.ejs");
};

module.exports.updateProfile = (req, res) => {};

module.exports.companies = (req, res) => {
  res.render("pages/myCompanies.ejs");
};
