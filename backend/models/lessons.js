const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({

	level: Number,
	
	dialogue: {
    theme: String,
        total_number: Number,
		speaker: String,
		romanji: String,
		japanese: String,
		english: String,
		
	},
	practice: {
    theme: String,
    total_number: Number,
		word_jp: String,
		good_answer: String,
		wrong_answer_a: String,
		wrong_answer_b: String,
		wrong_answer_c: String,
		
	},
});

const Lesson = mongoose.model("lessons", lessonSchema);

module.exports = Lesson;
