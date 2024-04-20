const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  role: {
    type: Number,
    default: 0,
  },
  uid: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  dob: {
    type: Date,
  },
  university: {
    type: String,
  },
  college: {
    type: String,
  },
  branch: {
    type: String,
  },
  stream: {
    type: String,
  },
  cgpa: {
    type: Number,
  },
  tenth: {
    percentage: {
      type: Number,
    },
    board: {
      type: String,
    },
    school: {
      type: String,
    },
  },
  twelfth: {
    percentage: {
      type: Number,
    },
    board: {
      type: String,
    },
    school: {
      type: String,
    },
  },
  hometown: {
    city: {
      type: String,
    },

    state: {
      type: String,
    },
  },
  gap: {
    type: Number,
  },
  phone: {
    type: String,
  },
  resume: {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  batch: {
    type: Number,
  },
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
  password: {
    type: String,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
