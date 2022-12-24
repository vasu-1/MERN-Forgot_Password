const express = require("express");
const router = express.Router();
// const connectDB = require('../db');
require("dotenv").config();
const User = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailsender = require("./mailer");
const secret_key = process.env.SECRETKEYJWT;

generateAuthToken = async function (str) {
  try {
    let newtoken = jwt.sign(str, secret_key);
    return newtoken;
  } catch (err) {
    console.log(err);
  }
};

router.get("/api/v1", (req, res) => {
  res.send("Welcome to API Version 1");
});

// Signup
router.post("/api/v1/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the properties" });
  }

  try {
    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res.status(422).json({ error: "Email is already exist" });
    }
    const pin = Math.random().toString(36).substring(5, 7);
    var token = generateAuthToken(email);
    const user = new User({ email, password, token, pin });

    const userRegister = await user.save();

    const code = pin;
    if (userRegister) {
      mailsender.sendmailer(
        email,
        "Please Verify Your Email",
        "Use Below Code To Verify Your Email",
        code
      );
      return res
        .status(201)
        .json({ message: "Pin Sent Successfully, Kindly Check Your Email!" });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/v1/verify", async (req, res) => {
  const { email, pin } = req.body;

  if (!email || !pin) {
    return res.status(422).json({ error: "Something went wrong!" });
  }

  try {
    const emailExist = await User.findOne({ email: email });

    if (!emailExist) {
      return res.status(422).json({ error: "Something went wrong!!" });
    }
    if (emailExist) {
      mailsender.sendmailer(
        email,
        "You did it! & Verified",
        "Welcome to our MERN-Forgot Platform",
        "Enjoy our forgotting services"
      );
      return res
        .status(201)
        .json({
          message: "You are verified Successfully!",
          jwttokenloginuser: emailExist.token,
        });
    } else {
      res.status(500).json({ error: "Failed to verify user" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Login
router.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  console.log("Signin attempt");

  if (!username || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }

  try {
    const verifytoken = jwt.verify(token, secret_key);
    var usernameExist = await User.findOne({
      email: verifytoken.email,
      token: token,
    });
    // const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      const isMatch = await bcrypt.compare(password, usernameExist.password);

      if (isMatch) {
        return res
          .status(201)
          .json({
            message: "You are logged in!",
            jwttokenloginuser: usernameExist.token,
            userId: usernameExist._id,
          });
      } else {
        return res.status(422).json({ error: "Passwrd is incorrect!" });
      }
    } else {
      return res.status(422).json({ error: "You are not registered!" });
    }
  } catch (err) {
    console.log(err);
  }

  res.json({ message: req.body });
  // res.send('Hello from auth router signin');
});

module.exports = router;
