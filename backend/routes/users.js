var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkbody');

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['name','username','email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password: hash,
        token: uid2(32),
        level : String,
        avatar : String, 
        progress : String,
      });

      newUser.save().then(data => {
        res.json({ result: true, token: data.token });
      });
    } else {
     
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

router.post('/signin', (req, res) => {
  User.findOne({ email : req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

router.delete('/:token', (req, res) => {
  const { token } = req.params;

  // Recherche et suppression de l'élément
  User.deleteOne({token : token})
    .then((deletedElement) => {
      if (deletedElement) {
        res.json({ result: true, message: 'Élément supprimé avec succès' });
      } else {
        res.status(404).json({ result: false, message: 'Élément non trouvé' });
      }
    })
    .catch((err) => {
      res.status(500).json({ result: false, error: 'Erreur serveur' });
    });
});







module.exports = router;