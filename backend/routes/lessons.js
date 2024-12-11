var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Lesson = require("../models/lessons");
const Working = require("../models/working")


router.get("/showAllLessons/:token", (req, res) => {
  const { token } = req.params;
  User.findOne({ token: token }).then((dataUser) => {
    if (dataUser) {
      let userLevel = 1;
      Lesson.find({ level: userLevel }).then((data) => {
        res.json({ data: data });
      });
    } else {
      res.json({ result: false });
    }
  });
});

router.get("/showLesson/:lessonId/:token", (req, res) => {
  const { lessonId } = req.params;
  Lesson.findById(lessonId).then((data) => {
    console.log(data);
  });
});

router.get('/working', (req, res) => {
  Working.find()
 .populate('lesson','user')
 .then(data => {res.json({data : data})})

    // if(!lesson.dialogue.isDone){
    // Lesson.findById(lessonId).then((data) => {
    //   res.json(data.lesson.practice);
    // });
    // }
    // else {
    //   return res.json({practice : 'do lesson !'})
    // }
});

// route déclanché a la création d'un user une seule utilisation
 router.get('/all', (req,res)=> {
        let Array = []
        Lesson.find().then((data) => {
             for(let element of data){
               Array.push(element._id.toString()) // Convertir chaque ObjectId en chaîne 
               console.log(element.practice.isDone, element.dialogue.isRead, element.dialogue.japanese)
               }
               const newWorking = new Working ({
                user: '67586705c3529d4d899ff34b', // Exemple d'ID utilisateur
                lesson: Array,  
                dialogue_progress: {
                // '67586705c3529d4d899ff34b': false, // ID du dialogue
                // '675876557cb2559b8abfb0f7': false, // ID d'un autre dialogue
                // '6758765e7cb2559b8abfb0f8': false, // ID d'un autre dialogue
    },
                practice_progress: {
                // '67586705c3529d4d899ff34c': false, // ID d'un exercice
                // '675876557cb2559b8abfb0f9': true, // ID d'un autre exercice
    },
              })
              newWorking.save().then(data => {
                res.json({ result: true, data : data });
              });
        })

      });
      

module.exports = router;
