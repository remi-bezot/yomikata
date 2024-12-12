var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
	fetch("http://beta.jisho.org/api/v1/search/words?keyword=table")
		.then((response) => response.json())
		.then((data) => {
			res.json({ word_japanese: data.data });
		});
});

module.exports = router;
