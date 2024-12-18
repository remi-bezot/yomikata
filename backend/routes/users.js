var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Favorite = require("../models/favorites");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkbody");

router.post("/signup", (req, res) => {
  const { name, username, email, password } = req.body;
  if (!checkBody(req.body, ["name", "username", "email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }
  User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return res
        .status(400)
        .json({ result: false, error: "Email already exists" });
    }
    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hash,
      token: uid2(32),
    });
    newUser
      .save()
      .then(() =>
        res.json({ result: true, message: "User registered successfully" })
      )
      .catch((err) =>
        res.status(500).json({ result: false, error: err.message })
      );
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!checkBody(req.body, ["email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  User.findOne({ email })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ result: true, token: user.token, username: user.username });
      } else {
        res
          .status(401)
          .json({ result: false, error: "Invalid email or password" });
      }
    })
    .catch((err) =>
      res.status(500).json({ result: false, error: err.message })
    );
});

router.delete("/:token", (req, res) => {
  const { token } = req.params;
  console.log("Token received for deletion:", token);

  // Étape 1 : Trouver l'utilisateur
  User.findOne({ token })
    .then((user) => {
      if (!user) {
        // Si l'utilisateur n'est pas trouvé
        return res
          .status(404)
          .json({ result: false, message: "User not found" });
      }

      // Étape 2 : Supprimer l'utilisateur
      return User.deleteOne({ _id: user._id }).then(() => {
        // Étape 3 : Supprimer les favoris associés
        return Favorite.deleteMany({ userId: user._id }).then(
          (deletedFavorites) => {
            // Succès : Utilisateur et favoris supprimés
            res.json({
              result: true,
              message:
                "User account and associated favorites successfully deleted",
              deletedFavoritesCount: deletedFavorites.deletedCount, // Nombre de favoris supprimés
            });
          }
        );
      });
    })
    .catch((error) => {
      // Gérer les erreurs générales
      res.status(500).json({ result: false, error: error.message });
    });
});

router.post("/updatePractice", (req, res) => {
  const { token, practiceId } = req.body;

  if (!token || !practiceId) {
    return res
      .status(400)
      .json({ result: false, error: "Missing token or practiceId" });
  }

  User.findOneAndUpdate(
    { token },
    { $addToSet: { "practice_progress.practices_done": practiceId } }, // Évite les doublons
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ result: false, error: "User not found" });
      }
      res.json({ result: true, message: "Practice updated successfully" });
    })
    .catch((err) =>
      res.status(500).json({ result: false, error: err.message })
    );
});

router.post("/progress/checkExercise", (req, res) => {
  const { token, lessonId, themeIndex } = req.body;

  User.findOne({ token })
    .then((user) => {
      if (user) {
        const isDialogueDone = user.dialogue_progress.dialogues_done.includes(
          `${lessonId}-${themeIndex}`
        );
        const isPracticeDone = user.practice_progress.practices_done.includes(
          `${lessonId}-${themeIndex}`
        );

        res.json({
          result: true,
          isDone: isDialogueDone || isPracticeDone, // Si déjà fait dans dialogues ou pratiques
        });
      } else {
        res.status(404).json({ result: false, error: "User not found" });
      }
    })
    .catch((error) => res.status(500).json({ result: false, error }));
});

module.exports = router;
