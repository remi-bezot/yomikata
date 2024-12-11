const mongoose = require("mongoose");

const workingSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	dialogue_progress: {
		type: Map,
		of: Boolean,
	},
	practice_progress: { type: Map, of: Boolean },
});

const Working = mongoose.model("working", workingSchema);

module.exports = Working;
