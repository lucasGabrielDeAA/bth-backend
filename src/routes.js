const express = require('express');

const routes = express.Router();

const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');

// Incidents
routes.post('/incidents', IncidentController.create);

// ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

module.exports = routes;
