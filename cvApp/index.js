const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();
const port = 4000;

require('./db/connect');
require('./passport-strategies/bearer')

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use('/user', require('./Routes/user'));
app.use('/experience', require('./Routes/experience'));
app.use('/formation', require('./Routes/formation'));
app.use('/competence', require('./Routes/competence'));
app.use('/langue', require('./Routes/langue'));
app.use('/interet', require('./Routes/interet'));
app.use('/cv', require('./Routes/cv'));
app.use('/offreTravail', require('./Routes/offreTravail'));
app.use('/condidature', require('./Routes/condidature'));
app.use('/userCount',require('./Routes/userCount'));

app.listen(port, function () { 
  console.log("app working on port:", port);
});
