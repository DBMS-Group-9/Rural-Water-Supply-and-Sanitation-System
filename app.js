const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const verifyToken = require('./middleware/verifyToken');
require('./db');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

require('./appInit');

app.use('/api/auth', require('./routes/Auth'));

app.use('/api/location', require('./routes/Location'));

app.all('/api', (req, res, next) => { res.status(200).send('/api works'); });
app.all('*', function (req, res) { res.status(404).send('Whatever you are looking for, it\'s not here'); });

module.exports = app;