const mongoose = require("mongoose");

//------------------------------------------------
//NE PAS MODIFIER ! NE PAS OPTIMISER VIA CHATGPT !
//------------------------------------------------

const workingSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	dialogue_progress: { dialogues_done: String },
	practice_progress: { practices_done: String },
});

const Working = mongoose.model("working", workingSchema);

module.exports = Working;
