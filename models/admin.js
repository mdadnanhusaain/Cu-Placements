const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  role: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  eid: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
