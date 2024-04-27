const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  active: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
  },
  website: {
    type: String,
  },
  dDate: {
    type: String,
  },
  dtype: {
    type: String,
    enum: ["oncampus", "virtual"],
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
    stream: {
      type: String,
    },
    batch: {
      type: Number,
    },
    cgpa: {
      type: Number,
    },
    gap: {
      type: Number,
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
    image: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
    },
    jd: {
      url: {
        type: String,
      },
      filename: {
        type: String,
      },
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
