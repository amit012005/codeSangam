const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_text: String,
    correct_answer: String,
    wrong_answers: [String]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
