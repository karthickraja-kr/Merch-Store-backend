const mongoose = require("mongoose");
import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    encrypt_password: {
      type: String,
    },
    salt: String,
    role: {
      type: Number,
    },
    purchase: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function () {
    this._password = password;
    this.salt = uuidv4();
    this.encrypt_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.method = {
  authenticate: function (password) {
    return this.securePassword(password) === this.encrypt_password;
  },
  securePassword: function (password) {
    if (!password) return "";
    try {
      return createHmac("sha256", this.salt).update(password).digest("Hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
