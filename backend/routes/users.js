var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Working = require("../models/working");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkbody");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["name", "username", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data !== null) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
    });
    newUser
      .save()
      .then(() => res.json({ result: true }))
      .catch((err) =>
        res.status(500).json({ result: false, error: err.message })
      );
  });
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
