const mongoose = require("mongoose");

<<<<<<< HEAD
//------------------------------------------------
//NE PAS MODIFIER ! NE PAS OPTIMISER VIA CHATGPT !
//------------------------------------------------

const lineSchema = mongoose.Schema({
	speaker: String,
	japanese: String,
	romanji: String,
	english: String,
});

const exerciseSchema = mongoose.Schema({
	word_jp: String,
	good_answer: String,
	wrong_answer_a: String,
	wrong_answer_b: String,
	wrong_answer_c: String,
});

const themeSchema = mongoose.Schema({
	theme: String,
	speaker_number: Number,
	lines: [lineSchema],
	exo: [exerciseSchema],
});

const lessonSchema = mongoose.Schema({
	level: Number,
	themes: [themeSchema],
});

=======
const lineSchema = mongoose.Schema({
    speaker: String, // Interlocuteur
    romanji: String, // Texte en romanji
    japanese: String, // Texte en japonais
    english: String, // Tableau de lignes (répliques)

    // Traduction en anglais
});

const exerciseSchema = mongoose.Schema({
    word_jp: String, // Mot japonais
    good_answer: String, // Bonne réponse
    wrong_answer_a: String, // Mauvaise réponse A
    wrong_answer_b: String, // Mauvaise réponse B
    wrong_answer_c: String, // Mauvaise réponse C
});

const themeSchema = mongoose.Schema({
    theme: String, // Thème du dialogue (ex : "train", "resto", etc.)
    speaker_number: Number,
    lines: [lineSchema], // Répliques dans le dialogue
    exo: [exerciseSchema], // Exercice de vocabulaire
});

const lessonSchema = mongoose.Schema({
    level: Number, // Niveau de la leçon (1, 2, etc.)
    themes: [themeSchema], // Liste des thèmes pour ce niveau
});

>>>>>>> devp
const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;

