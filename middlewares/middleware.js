const Company = require("../models/company.js");
const User = require("../models/user.js");

// Login Validation
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to proceed!");
    return res.redirect("/student/login");
  }
  next();
};

// Saving source URL
module.exports.saveRedirectUrl = async (req, res, next) => {
  try {
    if (!req.session.redirectUrl) {
      throw new Error();
    }
    let url = `${req.protocol}://${req.get("host")}${req.session.redirectUrl}`;
    console.log(`URL : ${url}`);
    const response = await fetch(url);
    if (response.status < 400) {
      res.locals.redirectUrl = req.session.redirectUrl;
    }
  } catch (err) {
    res.locals.redirectUrl = "/";
  }
  next();
};

// Admin Validation
module.exports.isAdmin = async (req, res, next) => {
  try {
    let id;

    try {
      if (res.locals.currUser) {
        id = res.locals.currUser._id;
      } else if (req.body.username) {
        let username = req.body.username;
        let admin = await User.findByUsername(username);
        id = admin._id;
      }
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/admin/login");
    }

    let user = await User.findById(id);

    if (user) {
      if (user.role === 0) {
        req.flash(
          "error",
          "This account is a Student Account! Please login as Student to continue"
        );
        return res.redirect(`/student/login`);
      } else if (user.role === 2) {
        req.flash(
          "error",
          "Your account has not been granted Admin Rights! Please contact your Administrator to get it approved."
        );
        return res.redirect(`/`);
      }
    }
    next();
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(res.locals.redirectUrl);
  }
};

// Student Validation
module.exports.isStudent = async (req, res, next) => {
  try {
    let id;

    try {
      if (res.locals.currUser) {
        id = res.locals.currUser._id;
      } else if (req.body.username) {
        let username = req.body.username;
        let student = await User.findByUsername(username);
        id = student._id;
      }
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/student/login");
    }

    let user = await User.findById(id);

    if (user) {
      if (user.role === 1) {
        req.flash(
          "error",
          "This account is an Admin Account! Please login as Admin to continue"
        );
        return res.redirect(`/admin/login`);
      } else if (user.role === 2) {
        req.flash(
          "error",
          "Your account has not been granted Admin Rights! Please contact your Administrator to get it approved."
        );
        return res.redirect(`/`);
      }
    }
    next();
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(res.locals.redirectUrl);
  }
};

module.exports.isEligible = async (req, res, next) => {
  let { id } = req.params;
  let userId = res.locals.currUser._id;
  try {
    let company = await Company.findById(id);
    let student = await User.findById(userId);

    // Checking eligibility criteria
    const { eligibility } = company;
    const { academics, university } = student;

    // Check 10th score
    if (academics.tenth.percentage < eligibility.tenth) {
      req.flash(
        "error",
        "You do not meet the 10th grade percentage requirement."
      );
      return res.redirect(`/company/about/${id}`);
    }

    // Check 12th score
    if (academics.twelfth.percentage < eligibility.twelfth) {
      req.flash(
        "error",
        "You do not meet the 12th grade percentage requirement."
      );
      return res.redirect(`/company/about/${id}`);
    }

    // Check university branch
    if (university.branch !== eligibility.branch) {
      req.flash("error", "Your branch does not meet the eligibility criteria.");
      return res.redirect(`/company/about/${id}`);
    }

    // Check stream
    if (university.stream !== eligibility.stream) {
      req.flash("error", "Your stream does not meet the eligibility criteria.");
      return res.redirect(`/company/about/${id}`);
    }

    // Check CGPA
    if (university.cgpa < eligibility.cgpa) {
      req.flash("error", "Your CGPA does not meet the minimum requirement.");
      return res.redirect(`/company/about/${id}`);
    }

    // Check educational gap
    if (university.gap > eligibility.gap) {
      req.flash("error", "Your educational gap exceeds the allowable limit.");
      return res.redirect(`/company/about/${id}`);
    }

    // Check batch year
    if (university.batch !== eligibility.batch) {
      req.flash("error", "You are not eligible due to your batch year.");
      return res.redirect(`/company/about/${id}`);
    }

    // If all checks pass, proceed to the next middleware
    next();
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(`/company/about/${id}`);
  }
};
