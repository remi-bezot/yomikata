var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const { getWords } = require("../functions/function");

// Fonction utilitaire pour récupérer un mot depuis Jisho
async function fetchWordFromJisho(word) {
  const response = await fetch(
    `https://jisho.org/api/v1/search/words?keyword=${word}`
  );
  const data = await response.json();
  if (!data.data || data.data.length === 0) {
    throw new Error("Word not found on Jisho.");
  }
  return data.data.slice(0, 3).map((item) => ({
    Kanji: item.slug,
    WaniKani: item.tags.slice(0, 3),
    English: item.senses[0].english_definitions.slice(0, 3),
    Grammar: item.senses[0].parts_of_speech.slice(0, 3),
    Hiragana: item.japanese.slice(0, 3).map((jap) => ({
      word: jap.word,
      reading: jap.reading,
    })),
  }));
}

// ROUTE : Recherche de mot
router.post("/getWord/:word", async (req, res) => {
  try {
    const user = await User.findOne({
      token: "Uzz57VoeewdCwcFNvf6OioXkwbf2uitz",
    });
    if (!user) return res.json({ error: "Utilisateur non trouvé" });

    const word = req.params.word;
    const words = await fetchWordFromJisho(word);
    const wanikaniLow = getWords(words);

    const jlptResponse = await fetch(
      `https://jlpt-vocab-api.vercel.app/api/words?word=${wanikaniLow.Kanji}`
    );
    const jlptData = await jlptResponse.json();

    res.json({
      wanikaniLow,
      romaji: jlptData.words[0]?.romaji || "No romanji",
    });
  } catch (error) {
    console.error("Erreur dans getWord:", error.message);
    res.json({ error: error.message });
  }
});

// ROUTE : Mot aléatoire
router.get("/random", async (req, res) => {
  try {
    const user = await User.findOne({
      token: "Uzz57VoeewdCwcFNvf6OioXkwbf2uitz",
    });
    if (!user) return res.json({ error: "Utilisateur non trouvé" });

    const response = await fetch(
      "https://jlpt-vocab-api.vercel.app/api/words/random"
    );
    const word = await response.json();

    res.json({ word });
  } catch (error) {
    console.error("Erreur dans random:", error.message);
    res.json({ error: error.message });
  }
});

module.exports = router;
