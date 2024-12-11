var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Lesson = require("../models/lessons");

router.get("/showAllLessons/:token", (req, res) => {
  const { token } = req.params;

  User.findOne({ token: token }).then((dataUser) => {
    if (dataUser) {
      let userLevel = 1;
      Lesson.find({ level: userLevel }).then((data) => {
        res.json({ data: data });
      });
    } else {
      res.json({ result: false });
    }
  });
});

router.get("/showLesson/:lessonId/:token", (req, res) => {
  const { lessonId, token } = req.params;

  Lesson.findById(lessonId).then((data) => {
    console.log(data);
  });
});

module.exports = router;
