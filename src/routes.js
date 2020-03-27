const express = require('express');
const { celebrate, Segments, Joi }  = require('celebrate');

const routes = express.Router();

const IncidentController = require('./controllers/IncidentController');
const OngController = require('./controllers/OngController');
const SessionController = require('./controllers/SessionController');

// Incidents
routes.get('/incidents', IncidentController.index);

routes.get('/incidents/ong', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
}), IncidentController.incidentsByOng);

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  }),
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), IncidentController.delete);

// ONGS
routes.get('/ongs', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
}), OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),
}), OngController.create);

// SESSION
routes.post('/sessions', SessionController.create);

module.exports = routes;
