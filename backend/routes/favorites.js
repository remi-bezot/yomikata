var express = require("express");
var router = express.Router();

require("../models/connection");
const Favorite = require("../models/favorites");
const User = require("../models/users");

router.get("/showFavorites/:token", (req, res) => {
	const token = req.params.token;

	User.findOne({ token: token }).then((data) => {
		if (data) {
			console.log(data);

			Favorite.find({ id_user: data._id }).then((data) => {
				res.json({ result: data });
			});
		}
	});
});

router.post("/createFavorite/:token", (req, res) => {
	User.findOne({ token: req.params.token }).then((data) => {
		Favorite.findOne({ id_user: data._id, Word_JP: req.body.wordjp }).then(
			(element) => {
				console.log(element);

				if (element === null) {
					const newFavorite = new Favorite({
						Word_JP: req.body.wordjp,
						Word_EN: req.body.worden,
						Romanji: req.body.romanji,
						Grammar: req.body.grammar,
						isBook: req.body.isbook,
						id_user: data._id,
					});

					newFavorite.save().then((newDoc) => {
						res.json({ result: true, status: true, data: newDoc });
						console.log("hshshshsh");
					});
				}
			}
		);
	});
});

router.delete("/deleteFavorite/", (req, res) => {
	Favorite.deleteOne({ _id: req.body.id }).then(() => {
		Favorite.find().then((data) => {
			console.log(data);
			res.json({ result: "word deleted", data: data });
		});
	});
});

module.exports = router;
