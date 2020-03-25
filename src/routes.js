const express = require('express');

const routes = express.Router();

const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');

// Incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

module.exports = routes;