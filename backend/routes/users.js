var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkbody");

router.post("/signup", async (req, res) => {
  try {
    if (!checkBody(req.body, ["name", "username", "email", "password"])) {
      return res
        .status(400)
        .json({ result: false, error: "Missing or empty fields" });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ result: false, error: "Email already exists" });
    }

    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({ result: true, token: savedUser.token });
    } else {
      return res
        .status(500)
        .json({ result: false, error: "Failed to save user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(200).json({ result: true, token: user.token });
    } else {
      return res
        .status(401)
        .json({ result: false, error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: "Internal server error" });
  }
});

router.delete("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const result = await User.deleteOne({ token });
    if (result.deletedCount > 0) {
      return res
        .status(200)
        .json({ result: true, message: "User account successfully deleted" });
    } else {
      return res.status(404).json({ result: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: "Internal server error" });
  }
});

module.exports = router;
