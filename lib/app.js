const app = require('express')();
const morgan = require('morgan')('dev');
const errorHandler = require('./error-handler')();
const burners = require('./routes/burn');
const auth = require('./routes/auth');
const ensureRole = require('./auth/ensure-role');
const ensureAuth = require('./auth/ensure-auth');

app.use(morgan);

app.use('/auth', auth);
app.use('/burn', ensureAuth, burners);

app.use(errorHandler);

module.exports = app;