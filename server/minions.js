const express = require('express');
minionsRouter = express.Router();

const { getAllFromDatabase, 
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');


minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    let updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleteMinion) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleJob) => {
        return singleJob.minionId === req.params.minionId;
    })
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        updateWork = updateInstanceInDatabase('work', req.body);
        res.send(updateWork);
    }
    
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleteWork = deleteFromDatabasebyId('work', req.params.workId);
    if (deleteWork) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})

module.exports = minionsRouter;