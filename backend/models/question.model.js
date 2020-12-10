const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    questionText: {
        type: String,
      },
      questionType: {
        type: String,
      },
      answerOptions: {
        type: Array,
      }
});

const Questions = mongoose.model('Questions', questionsSchema);
module.exports = Questions;
