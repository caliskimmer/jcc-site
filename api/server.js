const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8080;

// initialize dotenv
require('dotenv').config();

// initialize Mongoose User model
require('./models/user')();

// Connect mongodb
const mongodPath = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(mongodPath, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// routes
let routes = require('./routes/routes.js');
app.use('/api', routes);

// passport
require('./services/passport')(app);

// launch server
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
