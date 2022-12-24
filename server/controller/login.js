const express = require("express");
const router = express.Router();
// const connectDB = require('../db');
require("dotenv").config();
const User = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailsender = require("./mailer");
const secret_key = process.env.SECRETKEYJWT;
var crypto = require("crypto");

generateAuthToken = function (str) {
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
    const pin = Math.random().toString(36).substring(2, 7);
    var token = generateAuthToken(email);
    const user = new User({ email, password, token, pin });

    const userRegister = await user.save();

    const code = pin;
    if (userRegister) {
      mailsender.sendmailer(
        email,
        "Please Verify Your Email",
        "Use Below Code To Verify Your Email",
        code,
        "Email Verification"
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
      if (pin == emailExist.pin) {
        const emailExist = await User.updateOne({ email: email }, {verify:true});
        mailsender.sendmailer(
          email,
          "You did it! & Verified",
          "Welcome to our MERN-Forgot Platform",
          "Enjoy our forgotting services",
          "Welcome To MERN Forgot"
        );
        return res.status(201).json({
          message: "You are verified Successfully!",
          jwttokenloginuser: emailExist.token,
        });
      }else{
        return res.status(422).json({ error: "Incorrect pin entered!" });
      }
    } else {
      res.status(500).json({ error: "Failed to verify user" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/v1/forgot_password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Please enter a mail!" });
  }

  try {
    const emailExist = await User.findOne({ email: email });

    if (!emailExist) {
      return res.status(422).json({ error: "You are not registered!" });
    }
    if (emailExist) {
      if(emailExist.verify){
        var id = crypto.randomBytes(35).toString('hex');
        var code = "http://localhost:3000/reset_paddword?id="+id+"&token="+emailExist.token;
        await User.updateOne({ email: email }, {pin:id});
        mailsender.sendmailer(
          email,
          "Reset Password Requested",
          "Use below link to reset the password",
          code,
          "Password Reset"
        );
        return res.status(201).json({
          message: "Check your mail for reset password link!",
        });
      }else{
        return res.status(422).json({ error: "You are not verified, so you can't reset the password!" });
      }
    } else {
      res.status(500).json({ error: "Something went wrong!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/v1/reset_password_access", async (req, res) => {
  const { token, pin } = req.body;

  if (!token || !pin) {
    return res.status(422).json({ error: "something went wrong" });
  }

  try {
    const tokenExist = await User.findOne({ token });

    if (!tokenExist) {
      return res.status(422).json({ error: "You are not registered!" });
    }
    if (tokenExist) {
      if(tokenExist.verify){
        if(tokenExist.pin == pin){
          return res.status(201).json({
            message: "fine!",
          });
        }else{
          res.status(422).json({ error: "Something went wrong!" });
        }
      }else{
        return res.status(422).json({ error: "You are not verified, so you can't reset the password!" });
      }
    } else {
      res.status(500).json({ error: "Something went wrong!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/api/v1/reset_password", async (req, res) => {
  const { token, pin, newPassword } = req.body;

  if (!token || !pin || !newPassword) {
    return res.status(422).json({ error: "something went wrong" });
  }

  try {
    const tokenExist = await User.findOne({ token });

    if (!tokenExist) {
      return res.status(422).json({ error: "You are not registered!" });
    }
    if (tokenExist) {
      if(tokenExist.verify){
        if(tokenExist.pin == pin){
          const salt = await bcrypt.genSalt();
          cryptPassword = await bcrypt.hashSync(newPassword, salt);
          await User.updateOne({ token: token }, {password:cryptPassword});
          return res.status(201).json({
            message: "Password Resetted Successfully!",
          });
        }else{
          res.status(422).json({ error: "Something went wrong!" });
        }
      }else{
        return res.status(422).json({ error: "You are not verified, so you can't reset the password!" });
      }
    } else {
      res.status(500).json({ error: "Something went wrong!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Login
router.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;

  console.log("Signin attempt");

  if (!email || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }

  try {
    var usernameExist = await User.findOne({
      email,
    });
    if (!usernameExist.verify) {
      return res.status(422).json({ error: "You are not verified!!" });
    }
    // const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      const isMatch = await bcrypt.compare(password, usernameExist.password);

      if (isMatch) {
        return res.status(201).json({
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
