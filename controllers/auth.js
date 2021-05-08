require("dotenv").config();

const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const { errors } = require("formidable");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      field: errors.array()[0].param,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesn't exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password Don't match",
      });
    }

    // Create Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // Store token
    res.cookie("token", token, { expire: new Date() + 999 });
    // response to Frontend
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.signUp = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      field: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to store in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Sucess",
  });
};

// protected routes

exports.isSigned = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// Custom Middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};
