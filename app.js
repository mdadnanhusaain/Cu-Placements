require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

// MongoDB Connection
async function main() {
  // await mongoose.connect(process.env.ATLAS_URL);
  await mongoose.connect(`${process.env.MONGO_URL}`);
}

main()
  .then((res) => {
    console.log("Successfully connected to Database\n");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("pages/Home.ejs");
});

app.get("/company/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  res.send(`Company Details :- ${id}`);
});

app.get("/profile", (req, res) => {
  res.send("Profile");
});

app.get("/login", (req, res) => {
  res.send("Login");
});

app.get("/signup", (req, res) => {
  res.send("SignUp");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
