const app = require('express')();
const morgan = require('morgan')('dev');
const errorHandler = require('./error-handler')();
//const burnPath = require('./routes/burnPeeps');
//const auth = require('./auth/ensure-auth');
//const ensureAuth = require('./auth/ensure-auth');

app.use(morgan);

//app.use('/auth', auth);
//app.use('/burnPeeps', ensureAuth, burners);

app.use(errorHandler);

module.exports = app;