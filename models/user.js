const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  role: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
  },
  uid: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  phone: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  university: {
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
    gap: {
      type: Number,
    },
    batch: {
      type: Number,
    },
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
    address: {
      type: String,
    },
    city: {
      type: String,
    },

    state: {
      type: String,
    },
  },
  resume: {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;
