var express = require("express");
var router = express.Router();

require("../models/connection");
const Lesson = require("../models/lessons");

router.get("/showPractice/:practiceId", (req, res) => {
  const { practiceId } = req.params;
  Lesson.findById({ practiceId }).then((data) => {
    res.json({ result: true, data: data });
  });
});

module.exports = router;
