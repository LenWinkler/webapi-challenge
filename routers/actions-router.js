const Actions = require('../data/helpers/actionModel');

const router = require('express').Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('error getting actions', err);
            res.status(500).json({ errorMessage: "Unable to get actions" })
        })
});

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('error getting action by ID', err);
            res.status(500).json({ errorMessage: "Unable to get action by ID" })
        })
})

module.exports = router;