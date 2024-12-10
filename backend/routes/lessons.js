var express = require("express");
var router = express.Router();

// require("../models/connection");
// const User = require("../models/users");

router.get("/test", (req, res) => {
  res.json({ message: "Route de test OK !" });
});

router.get("/showAllLessons", (req, res) => {
  const { lessonId, token } = req.params;
  console.log(lessonId);

  //   User.findOne({ token: token }).then((data) => {});
  res.json({
    message: [
      {
        theme: "train",
        number: 1,
        id: 1,
      },
      {
        theme: "travel",
        number: 1,
        id: 2,
      },
      {
        theme: "train",
        number: 2,
        id: 3,
      },
      {
        theme: "restaurant",
        number: 1,
        id: 4,
      },
    ],
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
