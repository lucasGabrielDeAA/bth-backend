const express = require('express');

const PORT = 3333;

const app = express();

app.get('/', (request, response) => {
    return response.json({ id: Math.random, title: 'Semana omnistack', student: 'Lucas Gabriel'});
});

app.listen(PORT);