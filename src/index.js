const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT);
