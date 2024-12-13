var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
	// Appel à la première API
	fetch(`https://jlpt-vocab-api.vercel.app/api/words?word=${word}`)
		.then((response) => response.json())
		.then((jlptData) => {
			// Appel à la deuxième API
			fetch(`http://beta.jisho.org/api/v1/search/words?keyword=${word}`)
				.then((response) => response.json())
				.then((jishoData) => {
					let grammar = ["N/A"];
					// Traitement spécifique pour l'API 2 (Jisho)
					if (jishoData && jishoData.data && jishoData.data.length > 0) {
						const firstItem = jishoData.data[0];
						grammar = firstItem.senses[0]?.parts_of_speech || ["N/A"];
					}
					// Combine les deux résultats et les envoie
					res.json({
						jlpt: jlptData.words,
						jisho: {
							grammar: grammar,
						},
					});
				});
		});
});

module.exports = router;
