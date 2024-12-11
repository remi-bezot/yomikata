const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({

  user : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },

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
		wrong_answer: String,
		wrong_answer: String,
		wrong_answer: String,
		isDone: Boolean,
	},
});

const Lesson = mongoose.model("lessons", lessonSchema);

module.exports = Lesson;
