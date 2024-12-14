var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
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
      return res.json({ error: "Email already exists" });
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
        res.json({ result: false, error: err.message })
      );
  });
});

router.post("/signin", async (req, res) => {
  
    const user = User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      return res.json({ result: true, token: user.token });
    } else {
      return res.json({ result: false, error: "Invalid email or password" });
    }
});

router.delete("/:token",(req, res) => {
  
    const { token } = req.params;
    const result =  User.deleteOne({ token });
    if (result.deletedCount > 0) {
      return res.json({ result: true, message: "User account successfully deleted" });
    } else {
      return res.json({ result: false, message: "User not found" });
    }
  });

module.exports = router;
