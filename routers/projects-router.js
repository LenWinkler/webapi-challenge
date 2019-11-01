const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = require('express').Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('error getting projects', err);
            res.status(500).json({ errorMessage: "Unable to get projects" })
        })
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('get project by id error', err);
            res.status(500).json({ errorMessage: "Unable to get post by ID" })
        })
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('get post actions error', err);
            res.status(500).json({ errorMessage: "Unable to get actions for the post" })
        })
})

module.exports = router;