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
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('error adding project');
            res.status(500).json({ errorMessage: "Unable to add project" })
        })
});

router.post('/:id/actions', (req, res) => {
    Actions.insert({ ...req.body, project_id: req.params.id })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('error adding action', err);
            res.status(500).json({ errorMessage: "Unable to add action to project" })
        })
});

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(response => {
            if(response === null) {
                res.status(404).json({ errorMessage: "Couldn't find project with this ID" })
            } else {
                res.status(200).json(response)
            }
        })
        .catch(err => {
            console.log('error updating project', err);
            res.status(500).json({ errorMessage: "Unable to update project" })
        })
});

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(response => {
            res.status(200).json({ message: "Project successfully deleted" })
        })
        .catch(err => {
            console.log('error deleting project', err);
            res.status(500).json({ errorMessage: "Unable to delete project" })
        })
});

module.exports = router;