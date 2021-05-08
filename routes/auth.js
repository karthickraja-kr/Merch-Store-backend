var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
// Controllers
const { signOut, signUp, signIn } = require("../controllers/auth");

// Routes
router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  signUp
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({
      min: 1,
    }),
  ],
  signIn
);

router.get("/signout", signOut);

module.exports = router;
