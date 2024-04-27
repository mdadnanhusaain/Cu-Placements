require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utility/ExpressError.js");
const studentRouter = require("./routes/student.js");
const adminRouter = require("./routes/admin.js");
const companyRouter = require("./routes/company.js");
const Company = require("./models/company.js");
const User = require("./models/user.js");

const mongodbStore = MongoStore.create({
  mongoUrl: process.env.ATLAS_URL,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 60 * 60,
});

mongodbStore.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store: mongodbStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.engine("ejs", ejsMate);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.update = req.flash("update");
  res.locals.deleted = req.flash("deleted");
  res.locals.currUser = req.user;
  res.locals.appName = process.env.APP_NAME;
  next();
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

// 404 Error handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handling Middleware
app.use((err, req, res, next) => {
  console.log(err);
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
