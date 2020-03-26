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
});

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(response => {
            if(response === null) {
                res.status(404).json({ errorMessage: "Can't find action with that ID"})
            } else {
            res.status(200).json(response)
        }})
        .catch(err => {
            console.log('error updating action', err);
            res.status(500).json({ errorMessage: "Unable to update action" })
        })
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(response => {
            res.status(200).json({ message: "Action deleted successfully" })
        })
        .catch(err => {
            console.log('error deleting action', err);
            res.status(500).json({ errorMessage: "Unable to delete action" })
        })
})

module.exports = router;