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

app.use('/admin', require('./Routes/admin'));
app.use('/employee', require('./Routes/employee'));
app.use('/mission', require('./Routes/mission'));

app.listen(port, function () { 
  console.log("app working on port:", port);
});
