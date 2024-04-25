module.exports.loginForm = (req, res) => {
  res.render("user/ALogin.ejs");
};

module.exports.loginAdmin = (req, res) => {
  res.render("user/ALogin.ejs");
};

module.exports.signupForm = (req, res) => {
  res.render("user/ASignup.ejs");
};

module.exports.signupAdmin = (req, res) => {
  res.render("user/ASignup.ejs");
};
