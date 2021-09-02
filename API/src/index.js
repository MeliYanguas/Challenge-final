const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');

const routes = require('./routes');

const dbSettings = require('../config.json');

const app = express();

// settings
app.set('port', process.env.PORT || 4000);
const port = app.get('port');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(myConnection(mysql, dbSettings, 'single'));

// routes
app.use(routes);

// starting the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening at http://localhost:${port}`);
});
