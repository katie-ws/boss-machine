const express = require('express');
const app = require('../server');
const apiRouter = express.Router();

const minionsRouter = require('./minions.js');
app.use('/api/minions', minionsRouter);

const ideasRouter = require('./ideas');
app.use('/api/ideas', ideasRouter);

const meetingsRouter = require('./meetings');
app.use('/api/meetings', meetingsRouter);

module.exports = apiRouter;