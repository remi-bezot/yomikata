const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  theme: String,
  level: Number,
  total_number: Number,

  theme: String,
  level: Number,
  total_number: Number,

  dialogue: {
    speaker: String,
    romanji: String,
    japanese: String,
    english: String,
    isRead: Boolean,
  },
  practice: {
    word_jp: String,
    good_answer: String,
    wrong_answer_a: String,
    wrong_answer_b: String,
    wrong_answer_c: String,
    isDone: Boolean,
  },
});

const Lesson = mongoose.model("lessons", lessonSchema);

module.exports = Lesson;
