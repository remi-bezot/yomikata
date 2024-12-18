var express = require("express");
var router = express.Router();

require("../models/connection");
const Favorite = require("../models/favorites");
const User = require("../models/users");

router.get("/showFavorites/:token", (req, res) => {
	const token = req.params.token;

	User.findOne({ token: token }).then((data) => {
		if (data) {
			Favorite.find({ id_user: data._id })
				.populate("id_user")
				.then((data) => {
					res.json({ result: data });
				});
		}
	});
});

router.post("/updateFavorite/:token", (req, res) => {
	User.findOne({ token: req.params.token })
		.then((data) => {
			if (data) {
				Favorite.findOne({ Word_JP: req.body.wordjp }).then((element) => {
					if (!element) {
						const newFavorite = new Favorite({
							// Word_JP: req.body.wordjp,
							// Word_EN: req.body.worden,
							// Romanji: req.body.romanji,
							Grammar: req.body.grammar,
							// isBook: req.body.isbook,
							id_user: "675d9c395db1af3def9b657c",
						});

						newFavorite
							.save()
							.then((newDoc) => {
								res.json({ result: "word saved", data: newDoc });
							})
							.catch((err) => {
								res
									.status(500)
									.json({ result: "error saving word", error: err.message });
							});
					} else {
						element.deleteOne();
						res.json({ result: "word already exists" });
					}
				});
			} else {
				res.status(404).json({ result: "user not found" });
			}
		})
		.catch((err) => {
			res
				.status(500)
				.json({ result: "error finding user", error: err.message });
		});
});

router.delete("/deleteFavorite/:token", (req, res) => {
	User.findOne({ token: req.params.token }).then((data) => {
		if (data) {
			Favorite.findByIdAndDelete(req.body.id)
				.then((data) => {
					if (data) {
						console.log("iciiiiiiiii");
						res.json({ result: "word deleted" });
					} else {
						res.status(404).json({ result: "word not found" });
					}
				})
				.catch((err) => {
					console.error(err);
					res.status(500).json({ result: "error", error: err });
				});
		}
	});
});

module.exports = router;
