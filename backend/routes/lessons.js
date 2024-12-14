var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Lesson = require("../models/lessons");
const Working = require("../models/working");

//Affiche toutes les lecons
router.get("/showAllLessons/:token", (req, res) => {
	const { token } = req.params;

	User.findOne({ token: token }).then((dataUser) => {
		if (dataUser) {
			let userLevel = dataUser.level;
			Lesson.find({ level: userLevel }).then((data) => {
				res.json({ result: true, data: data });
			});
		} else {
			res.json({ result: false });
		}
	});
});

//affiice une lecon selon l'id
router.get("/showLesson/:token/:lessonId", (req, res) => {
	const { token } = req.params;
	const { lessonId } = req.params;

	User.findOne({ token: token }).then((dataUser) => {
		if (dataUser) {
			Lesson.findById(lessonId).then((data) => {
				if (data) {
					res.json({ result: true, data: data });
				} else {
					res.json({ result: "No lesson found" });
				}
			});
		} else {
			res.json({ result: "No user connected" });
		}
	});
});

//route déclanché a la création d'un user une seule utilisation

router.get("/working/:user_id", (req, res) => {
	const newWorking = new Working({
		user: req.params.user_id,
		dialogue_progress: {},
		practice_progress: {},
	});
	newWorking.save().then((data) => {
		res.json({ result: true, data: data });
	});
});

//UPDATE DIALOGUE PROGRESS NEXT BUTTON
router.post("/Progress_Dial", (req, res) => {
	const workingId = "6759b72c446c00d0eca97c57";
	const keyToUpdate = "iddunelesson4";
	const booleanValue = true;

	Working.findByIdAndUpdate(
		workingId,
		{ [`dialogue_progress.${keyToUpdate}`]: booleanValue }, // Syntaxe pour définir une clé dynamique
		{ new: true } // Retourne le document après mise à jour
	)
		.then((updatedWorking) => {
			if (updatedWorking) {
				res.json({ result: true, updatedWorking });
			} else {
				res.status(404).json({ result: false, message: "Élément non trouvé" });
			}
		})
		.catch((err) => {
			res.status(500).json({ result: false, error: err.message });
		});
});

//UPDATE EXERCICE PROGRESS NEXT BUTTON
router.post("/Progress_Pract", (req, res) => {
	const workingId = "6759b72c446c00d0eca97c57";
	const keyToUpdate = "iddunexercice4";
	const booleanValue = true;

	Working.findByIdAndUpdate(
		workingId,
		{ [`practice_progress.${keyToUpdate}`]: booleanValue }, // Syntaxe pour définir une clé dynamique
		{ new: true } // Retourne le document après mise à jour
	)
		.then((updatedWorking) => {
			if (updatedWorking) {
				res.json({ result: true, updatedWorking });
			} else {
				res.status(404).json({ result: false, message: "Élément non trouvé" });
			}
		})
		.catch((err) => {
			res.status(500).json({ result: false, error: err.message });
		});
	const { lessonId, token } = req.params;
	Lesson.findById(lessonId).then((data) => {
		res.json({ data: data });
	});
});

module.exports = router;
