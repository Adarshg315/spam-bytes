const router = require('express').Router();
let Questions = require('../models/question.model');

router.route('/').get((req, res) => {
  Questions.find()
    .then((questions) => res.json(questions))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  const newQuestions = new Questions({
    title,
    description,
  });

  newQuestions
    .save()
    .then(() => res.json('Questions added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Questions.findById(req.params.id)
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Questions.findByIdAndDelete(req.params.id)
    .then(() => res.json('question deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Questions.findById(req.params.id)
    .then((question) => {
      question.title = req.body.title;
      question.description = req.body.description;
      question
        .save()
        .then(() => res.json('question updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
