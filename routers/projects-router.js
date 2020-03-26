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

router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('get project by id error', err);
            res.status(500).json({ errorMessage: "Unable to get post by ID" })
        })
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('get post actions error', err);
            res.status(500).json({ errorMessage: "Unable to get actions for the post" })
        })
});

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('error adding project');
            res.status(500).json({ errorMessage: "Unable to add project" })
        })
});

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log('error adding action', err);
            res.status(500).json({ errorMessage: "Unable to add action to project" })
        })
});

router.put('/:id', validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(response => {
                res.status(200).json(response)
        })
        .catch(err => {
            console.log('error updating project', err);
            res.status(500).json({ errorMessage: "Unable to update project" })
        })
});

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(response => {
            res.status(200).json({ message: "Project successfully deleted" })
        })
        .catch(err => {
            console.log('error deleting project', err);
            res.status(500).json({ errorMessage: "Unable to delete project" })
        })
});

// middleware

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
        .then(response => {
            if(response) {
                next()
            } else {
                res.status(404).json({ errorMessage: "Project with that ID does not exist" })
            }
        })
        .catch(err => {
            console.log('error validating project id', err)
        })
};

function validateProject(req, res, next) {
    if(!req.body) {
        res.status(400).json({ errorMessage: "Project information required" })
    } else if(!req.body.name || !req.body.description) {
        res.status(400).json({ errorMessage: "Please include both name and description for project" })
    } else {
        next()
    }
};

function validateAction(req, res, next) {
    const action = req.body;
    if(!req.body) {
        res.status(400).json({ errorMessage: "Action information required" })
    } else if(!action.description || !action.notes) {
        res.status(400).json({ errorMessage: "Project id, description, and notes are required" })
    } else {
        req.body.project_id = req.params.id;
        next()
    }
}

module.exports = router;