module.exports.loginForm = (req, res) => {
  res.render("user/SLogin.ejs");
};
module.exports.loginStudent = (req, res) => {
  res.render("user/SLogin.ejs");
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

module.exports.companies = (req, res) => {
  res.render("pages/myCompanies.ejs");
};
