const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
  },

  dtype: {
    type: String,
    enum: ["oncampus", "virtual"],
  },
  dDate: {
    type: String,
  },
  website: {
    type: String,
  },
  desc: {
    type: String,
  },
  eligibility: {
    tenth: {
      type: Number,
    },
    twelfth: {
      type: Number,
    },
    branch: {
      type: String,
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
    gap: {
      type: String,
    },
  },
  jd: {
    position: {
      type: String,
    },
    package: {
      type: String,
    },

    location: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },

    bond: {
      type: String,
    },
  },
  file: {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
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
