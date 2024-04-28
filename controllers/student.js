const User = require("../models/user.js");

module.exports.signupForm = (req, res) => {
  res.render("user/SSignup.ejs");
};

module.exports.signupStudent = async (req, res) => {
  try {
    let student = { ...req.body.student };
    let newStudent = new User(student);

    // Adding Image details
    let image = req.files["student[file][image]"][0];
    newStudent.file.image.url = image.path;
    newStudent.file.image.filename = image.originalname;

    // Adding Resume details
    let resume = req.files["student[file][resume]"][0];

    let filename = resume.originalname;
    filename = filename.split(".");
    jdFileExt = filename[1];
    filename = filename[0];
    filename = filename.replaceAll(" ", "_");

    let url = resume.path;
    let urlArray = url.split("upload");
    url = urlArray[0] + "upload/fl_attachment:" + filename + urlArray[1];
    filename = filename + `.${jdFileExt}`;

    newStudent.file.resume.url = url;
    newStudent.file.resume.filename = filename;

    let registeredStudent = await User.register(newStudent, student.password);

    console.log(`Registered Student :- ${registeredStudent}`);

    req.login(registeredStudent, (err) => {
      if (err) {
        return next(err);
      }
      req.flash(
        "success",
        `Hi @${student.name}!  Welcome to ${res.locals.appName}`
      );
      res.redirect("/");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/student/signup");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("user/SLogin.ejs");
};

module.exports.loginStudent = async (req, res) => {
  try {
    let { username } = req.body;
    let student = await User.findByUsername(username);
    req.flash(
      "success",
      `Welcome to ${res.locals.appName}! You are logged in as @${student.username}`
    );
    if (res.locals.redirectUrl) res.locals.redirectUrl = res.locals.redirectUrl;
    else res.locals.redirectUrl = "/";
    res.redirect(res.locals.redirectUrl);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/student/login");
  }
};

module.exports.profile = async (req, res) => {
  try {
    let { username } = req.params;
    let student = await User.findByUsername(username);
    res.render("pages/profile.ejs", { student });
  } catch (err) {
    req.flash("error", err.message);
    if (res.locals.redirectUrl) res.locals.redirectUrl = res.locals.redirectUrl;
    else res.locals.redirectUrl = "/";
    res.redirect(res.locals.redirectUrl);
  }
};

module.exports.editProfile = async (req, res) => {
  let student = await User.findById(res.locals.currUser._id);
  res.render("pages/editProfile.ejs", { student });
};

module.exports.updateProfile = async (req, res) => {
  try {
    let id = res.locals.currUser._id;

    let student = req.body.student;
    let newStudent = await User.findByIdAndUpdate(id, { ...student });

    if (req.files["student[file][image]"] !== undefined) {
      let image = req.files["student[file][image]"][0];

      newStudent.file.image.url = image.path;
      newStudent.file.image.filename = image.originalname;
    }

    if (req.files["student[file][resume]"] !== undefined) {
      let resume = req.files["student[file][resume]"][0];

      let filename = resume.originalname;
      filename = filename.split(".");
      jdFileExt = filename[1];
      filename = filename[0];
      filename = filename.replaceAll(" ", "_");

      let url = resume.path;
      let urlArray = url.split("upload");
      url = urlArray[0] + "upload/fl_attachment:" + filename + urlArray[1];
      filename = filename + `.${jdFileExt}`;

      newStudent.file.resume.url = url;
      newStudent.file.resume.filename = filename;
    }

    let updatedStudent = await newStudent.save();
    console.log(`Updated Details :- ${updatedStudent}`);

    req.flash("success", `Your Profile Details are updated successfully!`);
    res.redirect(`/student/profile/${updatedStudent.username}`);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/student/signup");
  }
};

module.exports.companies = async (req, res) => {
  let student = await User.findById(res.locals.currUser._id);
  res.render("pages/myCompanies.ejs", { student });
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

module.exports.allStudents = async (req, res, next) => {
  let students = await User.find({ role: 0 }).exec();
  res.render("pages/allStudents.ejs", { students });
};
