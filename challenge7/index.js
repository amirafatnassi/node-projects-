const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();

const port = 4000;

require('./database/connect');

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use('/api',require('./Routes/api'));

app.listen(port, function () {
  console.log("app working on port:", port);
});