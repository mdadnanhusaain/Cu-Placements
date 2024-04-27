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

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    if (res.locals.deleted.length === 0)
      req.flash("success", "You are logged out!");
    else req.flash("deleted", res.locals.deleted[0]);
    res.redirect("/");
  });
};