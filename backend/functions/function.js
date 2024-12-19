function getWords(words) {
<<<<<<< HEAD
	const filtered = words
		.filter((word) => word.WaniKani.length)
		.map((word) => ({
			...word,
			level: parseInt(word.WaniKani[0].replace("wanikani", "")),
		}))
		.sort((a, b) => a.level - b.level);
=======
  const filtered = words
    .filter((word) => word.WaniKani.length)
    .map((word) => ({
      ...word,
      level: parseInt(word.WaniKani[0].replace("wanikani", "")),
    }))
    .sort((a, b) => a.level - b.level);
>>>>>>> 69503ca8cb178249cd2b13e5052d777f97e7fa7e

  return filtered[0] || null || words[0];
}
<<<<<<< HEAD
module.exports = { getWords };
=======

module.exports = { getWords };
>>>>>>> 69503ca8cb178249cd2b13e5052d777f97e7fa7e
