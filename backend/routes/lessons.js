var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");

router.post("/showLessons/lessonId/:token", (req, res) => {
  const { lessonId, token } = req.params;
  User.findOne({ token: token }).then((data) => {});
  res.json({
    message: `lessons id ${lessonId} from user ${token}`,
  });
});
