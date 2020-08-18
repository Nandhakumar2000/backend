const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameDetailsSchema = new Schema({
   question: {type: String,required: true},
   answer: {type: String, required: true},
   image: {type: String, required: true},
   shuffledAnswer: {type: String, required: true},
});

const step = new Schema({
  stepImage: {type: String,required: true},
  stepHeading: {type: String, required: true},
  stepDescription: {type: String, required: true},
});

const gameSchema = new Schema({
  gameName: { type: String, required: true },
  gameBanner: { type: String, required: true },
  questionTime: { type: Number, required: true },
  grandPriceImage: { type: String, required: true },
  gameType: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  gradientColor1: {type: String, required: true},
  gradientColor2: {type: String, required: true},
  questions: [gameDetailsSchema],
  steps: [step]
}, {
  timestamps: true,
});

//const GameDetails = mongoose.model('GameDetails', gameDetailsSchema);
const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
//module.exports = GameDetails;