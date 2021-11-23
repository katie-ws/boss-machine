const express = require('express');
ideasRouter = express.Router();

const { 
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
 } = require('./db');

 const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea= addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let updateIdeas = updateInstanceInDatabase('ideas', req.body);
    res.send(updateIdeas);
});

ideasRouter.delete('/:id', (req, res, next) => {
    const deleteIdea = deleteFromDatabasebyId('ideas', req.params.id);
    if (deleteIdea) {
        res.status(204);
    } else {
        res.status(404);
    }
    res.send();
});

module.exports = ideasRouter;