const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi= require('./routes/movies.js');

const {logError, wrapErrors, errorHandler} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/noFoundHandler');

//body parser
app.use(express.json());

moviesApi(app);

// Error 404
 app.use(notFoundHandler);

// manejadores de errores
app.use(logError);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}/api/movies/`);
});

