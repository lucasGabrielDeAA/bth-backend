const express = require('express');

const routes = express.Router();

const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const SessionController = require('./controllers/SessionController');

// Incidents
routes.get('/incidents', IncidentController.index);
routes.get('/incidents/ong', IncidentController.incidentsByOng);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// SESSION
routes.post('/sessions', SessionController.create);

module.exports = routes;
