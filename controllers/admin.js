const User = require("../models/user");

module.exports.signupForm = (req, res) => {
  res.render("user/ASignup.ejs");
};

module.exports.signupAdmin = async (req, res) => {
  try {
    let admin = { ...req.body.admin };
    let newAdmin = new User(admin);
    newAdmin.role = 2;

    let registeredAdmin = await User.register(newAdmin, admin.password);

    console.log("New Admin Request :- \n\n", registeredAdmin);

    req.flash(
      "success",
      `Hi ${registeredAdmin.name}! Your request for getting Admin rights has been received. Please contact your administrator to get it approved.`
    );

    res.redirect("/");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/admin/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("user/ALogin.ejs");
};

module.exports.loginAdmin = async (req, res) => {
  let { username } = req.body;

  let admin = await User.findByUsername(username);

  req.flash("success", `Welcome Admin @${admin.username}!`);
  if (!res.locals.redirectUrl) res.locals.redirectUrl = "/";
  res.redirect(res.locals.redirectUrl);
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
