var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");

router.get("/random", (req, res) => {
	User.findOne({ token: "Uzz57VoeewdCwcFNvf6OioXkwbf2uitz" }).then(
		(dataUser) => {
			if (dataUser) {
				fetch("https://jlpt-vocab-api.vercel.app/api/words/random")
					.then((response) => response.json()) // Convertit la réponse en JSON
					.then((word) => {
						res.json({ word: word });
					})
					.catch((error) => {
						console.error(
							"Erreur lors de la récupération des données :",
							error
						);
					});
			} else {
				res.json({ result: false });
			}
		}
	);
});

module.exports = router;
