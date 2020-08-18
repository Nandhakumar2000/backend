const router = require('express').Router();
let Game = require('../models/game.model');
let GameDetails = require('../models/game.model');

router.route('/').get((req, res) => {
  Game.find()
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const gameName = req.body.gameName;
  const gameBanner = req.body.gameBanner;
  const questionTime = Number(req.body.questionTime);
  const grandPriceImage = req.body.grandPriceImage;
  const gameType = req.body.gameType;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const gradientColor1 = req.body.gradientColor1;
  const gradientColor2 = req.body.gradientColor2;
  const questions = [];
  const steps = [];
  for(var i= 0; i< req.body.questions.length; i++){
    questions.push({
      "question": req.body.questions[i].question,
      "answer" : req.body.questions[i].answer,
      "image" : req.body.questions[i].image,
      "shuffledAnswer" : req.body.questions[i].shuffledAnswer
    });
  }
  for(var j= 0; j< req.body.steps.length; j++){
    steps.push({
      "stepImage": req.body.steps[j].stepImage,
      "stepHeading" : req.body.steps[j].stepHeading,
      "stepDescription" : req.body.steps[j].stepDescription,
    });
  }

  const newGame = new Game({
    gameName,
    gameBanner,
    questionTime,
    grandPriceImage,
    gameType,
    startTime,
    endTime,
    gradientColor1,
    gradientColor2,
    questions,
    steps,
  });

  newGame.save()
  .then(() => res.json('Game added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Game.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then(() => res.json('Game deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  Game.findById(req.params.id)
    .then(GameDetails=> {
        GameDetails.gameName = req.body.gameName;
        GameDetails.gameBanner = req.body.gameBanner;
        GameDetails.questionTime = Number(req.body.questionTime);
        GameDetails.grandPriceImage = req.body.grandPriceImage;
        GameDetails.gameType = req.body.gameType;
        GameDetails.startTime = req.body.startTime;
        GameDetails.endTime = req.body.endTime;
        GameDetails.gradientColor1 = req.body.gradientColor1;
        GameDetails.gradientColor2 = req.body.gradientColor2;
        GameDetails.questions = [];
        GameDetails.steps = [];
        for(var i= 0; i< req.body.questions.length; i++){
            GameDetails.questions.push({
              "question": req.body.questions[i].question,
              "answer" : req.body.questions[i].answer,
              "image" : req.body.questions[i].image,
              "shuffledAnswer" : req.body.questions[i].shuffledAnswer
            });
          }
          for(var j= 0; j< req.body.steps.length; j++){
            GameDetails.steps.push({
              "stepImage": req.body.steps[j].stepImage,
              "stepHeading" : req.body.steps[j].stepHeading,
              "stepDescription" : req.body.steps[j].stepDescription,
            });
          }
         GameDetails.save()
        .then(() => res.json(req.body.gameName))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;