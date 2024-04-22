const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
  },
  dtype: {
    type: String,
    enum: ["On Campus", "Virtual"],
  },
  dDate: {
    type: String,
  },
  website: {
    type: String,
  },
  eligibility: {
    tenth: {
      type: Number,
    },
    twelfth: {
      type: Number,
    },
    cgpa: {
      type: Number,
    },
    batch: {
      type: Number,
    },
    stream: {
      type: String,
    },
  },
  position: {
    type: String,
  },
  location: {
    type: String,
  },
  package: {
    type: String,
  },
  bond: {
    type: String,
  },
  processes: [
    {
      type: String,
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
