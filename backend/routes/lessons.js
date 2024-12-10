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

router.get("/showLessons/:lessonId/:token", (req, res) => {
  const { lessonId, token } = req.params;

  //   User.findOne({ token: token }).then((data) => {});
  res.json({
    id: lessonId,
    theme: "travel",
    number: 1,
    dialogues: [
      {
        speaker: 1,
        japanese: "fhdskjf",
        english: "jhkdsf",
        romanji: "jdfjklsd",
      },
      {
        speaker: 2,
        japanese: "gfd",
        english: "jhkeerzeezdsf",
        romanji: "ghjuu rte ter",
      },
      {
        speaker: 1,
        japanese: "fhdskjf",
        english: "jhkdsf",
        romanji: "jdfjklsd",
      },
      {
        speaker: 2,
        japanese: "gfd",
        english: "jhkeerzeezdsf",
        romanji: "ghjuu rte ter",
      },
    ],
  });
});

module.exports = router;
