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

app.use('/api/jobs', verifyToken, require('./routes/Jobs'));

app.use('/api/employees', verifyToken, require('./routes/Employees'));

app.use('/api/watersources', verifyToken, require('./routes/WaterSources'));

app.use('/api/waterusages', verifyToken, require('./routes/WaterUsage'));

app.use('/api/sanitationsystems', verifyToken, require('./routes/SanitationSystems'));

app.use('/api/families', verifyToken, require('./routes/Families'));

app.use('/api/donations', require('./routes/Donations'));

app.use('/api/expenditures', verifyToken, require('./routes/Expenditures'));

app.use('/api/utility', require('./routes/Utility'));

app.use('/api/analytics', require('./routes/Analytics'));

app.all('/api', (req, res, next) => { res.status(200).send('/api works'); });
app.all('*', function (req, res) { res.status(404).send('Whatever you are looking for, it\'s not here'); });

module.exports = app;